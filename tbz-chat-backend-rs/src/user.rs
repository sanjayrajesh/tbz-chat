use actix_web::{HttpResponse};
use actix_web::web::{Data, Json};
use sqlx::PgPool;
use uuid::Uuid;
use log::debug;
use crate::error::InternalError;
use crate::invitation::InvitationService;
use crate::mail::MailService;
use crate::verification_token;

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

pub async fn register(user: Json<RegisterUser>, pool: Data<PgPool>, invitation_service: InvitationService) -> Result<HttpResponse, InternalError> {
    let RegisterUser { email } = user.into_inner();
    let id = Uuid::new_v4();
    let enabled = false;

    let user: User = sqlx::query_as::<_, User>(
        r#"
        INSERT INTO users (id, email, enabled)
        VALUES ($1, $2, $3)
        RETURNING *
        "#
    )
        .bind(id)
        .bind(email)
        .bind(enabled)
        .fetch_one(pool.get_ref())
        .await?;

    debug!("Created {:?}", &user);

    let verification_token = verification_token::create(&user.id, pool.get_ref()).await?;

    Ok(HttpResponse::Created().json(UserDTO::from(user)))
}
