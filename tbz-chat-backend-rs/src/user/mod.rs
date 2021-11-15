mod repository;
mod service;

use actix_web::web::{Data, Json};
use actix_web::HttpResponse;

use crate::error::InternalError;

pub use repository::{UserRepository, UserRepositoryImpl};
pub use service::{UserService, UserServiceImpl};

#[derive(Debug, sqlx::FromRow)]
pub struct User {
    pub id: String,
    pub email: String,
    pub username: Option<String>,
    pub password: Option<String>,
    pub enabled: bool,
}

#[derive(Debug, serde::Deserialize)]
pub struct RegisterUser {
    email: String,
}

#[derive(Debug, serde::Serialize)]
pub struct UserDto {
    id: String,
    email: String,
    username: Option<String>,
    enabled: bool,
}

impl From<User> for UserDto {
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

pub async fn register(
    user: Json<RegisterUser>,
    user_service: Data<dyn UserService>,
) -> Result<HttpResponse, InternalError> {
    let user = user_service.register(user.into_inner()).await?;

    Ok(HttpResponse::Created().json(UserDto::from(user)))
}
