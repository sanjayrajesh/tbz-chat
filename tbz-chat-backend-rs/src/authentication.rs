use std::fmt::{Debug, Display, Formatter};
use std::sync::Arc;
use actix_web::{HttpResponse, ResponseError};
use actix_web::http::header::AUTHORIZATION;
use actix_web::http::StatusCode;
use actix_web::web::{Data, Json};
use async_trait::async_trait;
use hmac::{Hmac, NewMac};
use jwt::SignWithKey;
use sha2::Sha512;
use crate::user::{UserService};
use serde::Serialize;

#[derive(Debug)]
pub struct UnauthenticatedError;

impl Display for UnauthenticatedError {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        write!(f, "Unauthenticated")
    }
}

impl ResponseError for UnauthenticatedError {
    fn status_code(&self) -> StatusCode {
        StatusCode::UNAUTHORIZED
    }
}

#[derive(serde::Deserialize)]
pub struct LoginCredentials {
    email: String,
    password: String,
}

pub async fn login(credentials: Json<LoginCredentials>, authentication_service: Data<dyn AuthenticationService>) -> Result<HttpResponse, actix_web::Error> {
    authentication_service.login(credentials.into_inner()).await
}

#[async_trait]
pub trait AuthenticationService: Send + Sync {
    async fn login(&self, credentials: LoginCredentials) -> Result<HttpResponse, actix_web::Error>;
}

pub struct AuthenticationServiceImpl<U: UserService> {
    user_service: Arc<U>,
    key: Hmac<Sha512>,
}

impl<U: UserService> AuthenticationServiceImpl<U> {
    pub fn new(user_service: Arc<U>) -> Self {
        Self {
            user_service,
            key: Hmac::new_from_slice(DUMMY_SECRET).unwrap(),
        }
    }
}

const DUMMY_SECRET: &[u8] = b"dummy-secret";

#[derive(Debug, Serialize)]
struct Claims {
    sub: String,
}

#[async_trait]
impl<U: UserService> AuthenticationService for AuthenticationServiceImpl<U> {
    async fn login(&self, credentials: LoginCredentials) -> Result<HttpResponse, actix_web::Error> {
        let LoginCredentials {
            email,
            password,
        } = credentials;

        let user = self.user_service.find_by_email(&email).await?;
        let user = user.ok_or(UnauthenticatedError)?;

        let is_valid = bcrypt::verify(password, &user.password).unwrap_or(false);

        if !is_valid {
            return Err(UnauthenticatedError.into());
        }
        let claims = Claims {
            sub: user.id.clone(),
        };
        let token = claims.sign_with_key(&self.key).unwrap();

        let user = self.user_service.load_response(user).await?;

        let response = HttpResponse::Ok()
            .append_header((AUTHORIZATION, format!("Bearer {}", token)))
            .json(user);

        Ok(response)
    }
}

#[cfg(test)]
mod test {
    use actix_web::http::HeaderValue;
    use mockall::predicate::*;
    use bcrypt::DEFAULT_COST;
    use super::*;
    use crate::user::MockUserService;
    use crate::user::query::EnabledUser;
    use crate::user::response::UserResponse;

    #[actix_rt::test]
    async fn login_with_valid_credentials_and_enabled_user() {
        const EMAIL: &str = "test@example.com";
        const PASSWORD: &str = "12345";
        const USER_ID: &str = "test-user";
        let jwt_key: Hmac<Sha512> = Hmac::new_from_slice(b"dummy-key").unwrap();
        let expected_token = Claims {
            sub: USER_ID.into(),
        }.sign_with_key(&jwt_key).unwrap();
        let password_hash = bcrypt::hash(PASSWORD, DEFAULT_COST).unwrap();
        let found_user = EnabledUser {
            id: USER_ID.into(),
            email: EMAIL.into(),
            username: None,
            password: password_hash
        };
        let found_user_again = found_user.clone();

        let mut user_service = MockUserService::new();
        user_service
            .expect_find_by_email()
            .with(eq(EMAIL))
            .times(1)
            .returning(move |_| {
                Ok(Some(found_user.clone()))
            });

        user_service
            .expect_load_response()
            .with(eq(found_user_again))
            .times(1)
            .returning(|user: EnabledUser| {
                Ok(
                    UserResponse {
                        id: user.id,
                        email: user.email,
                        username: user.username,
                        chats: vec![],
                    }
                )
            });

        let authentication_service = AuthenticationServiceImpl {
            user_service: Arc::new(user_service),
            key: jwt_key,
        };

        let credentials = LoginCredentials {
            email: EMAIL.into(),
            password: PASSWORD.into(),
        };

        let response = authentication_service.login(credentials).await.unwrap();
        assert_eq!(response.status(), StatusCode::OK);

        let auth_header = response.headers().get(AUTHORIZATION).unwrap();
        let expected_auth_header = HeaderValue::from_str(&format!("Bearer {}", expected_token)).unwrap();

        assert_eq!(auth_header, expected_auth_header);
    }

    #[actix_rt::test]
    async fn login_with_valid_credentials_and_disabled_user() {
        const EMAIL: &str = "test@example.com";

        let mut user_service = MockUserService::new();
        user_service
            .expect_find_by_email()
            .with(eq(EMAIL))
            .times(1)
            .returning(|_| {
                Ok(None)
            });

        let authentication_service = AuthenticationServiceImpl::new(Arc::new(user_service));

        let credentials = LoginCredentials {
            email: EMAIL.into(),
            password: "12345".into(),
        };

        let response = authentication_service.login(credentials).await;
        assert!(response.is_err());
    }

    #[actix_rt::test]
    async fn login_with_invalid_credentials() {
        const EMAIL: &str = "test@example.com";
        const VALID_PASSWORD: &str = "valid";
        const INVALID_PASSWORD: &str = "invalid";
        let password_hash = bcrypt::hash(VALID_PASSWORD, DEFAULT_COST).unwrap();
        let found_user = EnabledUser {
            id: "test-user".into(),
            email: EMAIL.into(),
            username: None,
            password: password_hash
        };

        let mut user_service = MockUserService::new();
        user_service
            .expect_find_by_email()
            .with(eq(EMAIL))
            .times(1)
            .return_once(|_| Ok(Some(found_user)));

        let authentication_service = AuthenticationServiceImpl::new(Arc::new(user_service));

        let credentials = LoginCredentials {
            email: EMAIL.into(),
            password: INVALID_PASSWORD.into(),
        };

        let response = authentication_service.login(credentials).await;

        assert!(response.is_err());
    }
}