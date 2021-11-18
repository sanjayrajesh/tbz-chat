use std::sync::Arc;

use async_trait::async_trait;
use log::debug;
use sqlx::PgPool;

use crate::error::InternalError;
use crate::invitation::InvitationService;
use crate::user::{RegisterUser, UserRepository, UserRepositoryImpl};
use crate::user::query::{DisabledUser, EnabledUser};
use crate::user::response::UserResponse;
use crate::verification_token::VerificationTokenService;

#[cfg_attr(test, mockall::automock)]
#[async_trait]
pub trait UserService: Send + Sync {
    async fn register(&self, user: RegisterUser) -> Result<DisabledUser, InternalError>;

    async fn find_by_email(&self, email: &str) -> Result<Option<EnabledUser>, InternalError>;

    async fn load_response(&self, user: EnabledUser) -> Result<UserResponse, InternalError>;
}

pub struct UserServiceImpl<R, I, V>
    where
        R: UserRepository,
        I: InvitationService,
        V: VerificationTokenService,
{
    repository: R,
    invitation_service: Arc<I>,
    verification_token_service: Arc<V>,
}

impl<I, V> UserServiceImpl<UserRepositoryImpl, I, V>
    where
        I: InvitationService,
        V: VerificationTokenService,
{
    pub fn new(
        pool: PgPool,
        invitation_service: Arc<I>,
        verification_token_service: Arc<V>,
    ) -> Self {
        Self {
            repository: UserRepositoryImpl { pool },
            invitation_service,
            verification_token_service,
        }
    }
}

#[async_trait]
impl<R, I, V> UserService for UserServiceImpl<R, I, V>
    where
        R: UserRepository,
        I: InvitationService,
        V: VerificationTokenService,
{
    async fn register(&self, user: RegisterUser) -> Result<DisabledUser, InternalError> {
        let RegisterUser { email } = user;

        let user = self.repository.insert(&email).await?;

        debug!("Created {:?}", &user);

        let verification_token = self.verification_token_service.create(&user.id).await?;

        self.invitation_service
            .invite_user(&user.email, &verification_token.token)
            .await?;

        Ok(user)
    }

    async fn find_by_email(&self, email: &str) -> Result<Option<EnabledUser>, InternalError> {
        let user = self.repository.find_by_email(email).await?;

        Ok(user)
    }

    async fn load_response(&self, user: EnabledUser) -> Result<UserResponse, InternalError> {
        let response = self.repository.load_response(user).await?;

        Ok(response)
    }
}

#[cfg(test)]
mod test {
    use mockall::predicate::*;

    use crate::invitation::MockInvitationService;
    use crate::user::repository::MockUserRepository;
    use crate::verification_token::{MockVerificationTokenService, VerificationToken};

    use super::*;

    #[actix_rt::test]
    async fn register_works() {
        const EMAIL: &'static str = "user@example.com";
        const GENERATED_USER_ID: &'static str = "test-user";
        const GENERATED_TOKEN: &'static str = "test-token";

        let mut repository = MockUserRepository::new();
        repository
            .expect_insert()
            .with(eq(EMAIL))
            .times(1)
            .returning(|email| {
                let user = DisabledUser {
                    id: GENERATED_USER_ID.into(),
                    email: email.into()
                };

                Ok(user)
            });

        let mut token_service = MockVerificationTokenService::new();
        token_service
            .expect_create()
            .with(eq(GENERATED_USER_ID))
            .times(1)
            .returning(|user_id| {
                let token = VerificationToken {
                    id: "test-token".into(),
                    token: GENERATED_TOKEN.into(),
                    user_id: user_id.into(),
                };

                Ok(token)
            });

        let verification_token_service = Arc::new(token_service);

        let mut invitation_service = MockInvitationService::new();
        invitation_service
            .expect_invite_user()
            .withf(|email, token| email == EMAIL && token == GENERATED_TOKEN)
            .times(1)
            .returning(|_, _| Ok(()));

        let invitation_service = Arc::new(invitation_service);

        let user_service = UserServiceImpl {
            repository,
            invitation_service,
            verification_token_service,
        };

        let user = user_service
            .register(RegisterUser {
                email: EMAIL.into(),
            })
            .await
            .unwrap();

        assert_eq!(EMAIL, user.email);
    }
}
