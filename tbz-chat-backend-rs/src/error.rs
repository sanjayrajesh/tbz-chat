use std::fmt::{Debug, Display, Formatter};

use actix_web::ResponseError;
use lettre::transport::smtp::Error;

#[derive(Debug)]
pub enum InternalError {
    Sqlx(sqlx::Error),
    Mail(String),
}

impl Display for InternalError {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        use InternalError::*;

        match self {
            Sqlx(error) => {
                write!(f, "Sqlx error: {:?}", error)
            }
            Mail(error) => {
                write!(f, "Mail error: {}", error)
            }
        }
    }
}

impl ResponseError for InternalError {}

impl From<sqlx::Error> for InternalError {
    fn from(error: sqlx::Error) -> Self {
        InternalError::Sqlx(error)
    }
}

impl From<lettre::error::Error> for InternalError {
    fn from(error: lettre::error::Error) -> Self {
        InternalError::Mail(error.to_string())
    }
}

impl From<lettre::transport::smtp::Error> for InternalError {
    fn from(error: Error) -> Self {
        InternalError::Mail(error.to_string())
    }
}
