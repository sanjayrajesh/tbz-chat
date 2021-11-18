mod service;

pub use service::*;

#[derive(Debug, sqlx::FromRow, Clone)]
pub struct VerificationToken {
    pub id: String,
    pub token: String,
    pub user_id: String,
}
