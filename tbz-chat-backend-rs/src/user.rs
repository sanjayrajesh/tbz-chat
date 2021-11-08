use std::sync::Arc;

use actix_web::web::{Data, Json};
use actix_web::HttpResponse;
use log::debug;
use sqlx::PgPool;
use uuid::Uuid;

use crate::error::InternalError;
use crate::invitation::InvitationService;
use crate::verification_token::VerificationTokenService;

#[derive(Debug, sqlx::FromRow)]
pub struct User {
    id: String,
    email: String,
    username: Option<String>,
    password: Option<String>,
    enabled: bool,
}

#[derive(Debug, serde::Deserialize)]
pub struct RegisterUser {
    email: String,
}

#[derive(Debug, serde::Serialize)]
pub struct UserDTO {
    id: String,
    email: String,
    username: Option<String>,
    enabled: bool,
}

impl From<User> for UserDTO {
    fn from(user: User) -> Self {
        let User {
            id,
            email,
            username,
            enabled,
            ..
        } = user;

        Self {
            id,
            email,
            username,
            enabled,
        }
    }
}

pub struct UserService {
    pool: PgPool,
    invitation_service: Arc<InvitationService>,
    verification_token_service: Arc<VerificationTokenService>,
}

impl UserService {
    pub fn new(
        pool: PgPool,
        invitation_service: Arc<InvitationService>,
        verification_token_service: Arc<VerificationTokenService>,
    ) -> Self {
        Self {
            pool,
            invitation_service,
            verification_token_service,
        }
    }

    pub async fn register(&self, user: RegisterUser) -> Result<User, InternalError> {
        let RegisterUser { email } = user;
        let id = Uuid::new_v4();
        let enabled = false;

        let user: User = sqlx::query_as::<_, User>(
            r#"
        INSERT INTO users (id, email, enabled)
        VALUES ($1, $2, $3)
        RETURNING *
        "#,
        )
        .bind(id)
        .bind(email)
        .bind(enabled)
        .fetch_one(&self.pool)
        .await?;

        debug!("Created {:?}", &user);

        let verification_token = self.verification_token_service.create(&user.id).await?;

        Ok(user)
    }
}

pub async fn register(
    user: Json<RegisterUser>,
    user_service: Data<UserService>,
) -> Result<HttpResponse, InternalError> {
    let user = user_service.register(user.into_inner()).await?;

    Ok(HttpResponse::Created().json(UserDTO::from(user)))
}
