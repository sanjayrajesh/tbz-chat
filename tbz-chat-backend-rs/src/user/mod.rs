use actix_web::HttpResponse;
use actix_web::web::{Data, Json};

pub use service::{UserService, UserServiceImpl};
pub use repository::{UserRepository, UserRepositoryImpl};

#[cfg(test)]
pub use service::MockUserService;

use crate::error::InternalError;

mod service;
pub mod query;
mod repository;
pub mod response;

#[derive(Debug, serde::Deserialize)]
pub struct RegisterUser {
    email: String,
}

pub async fn register(
    user: Json<RegisterUser>,
    user_service: Data<dyn UserService>,
) -> Result<HttpResponse, InternalError> {
    let user = user_service.register(user.into_inner()).await?;

    Ok(HttpResponse::Created().json(user))
}
