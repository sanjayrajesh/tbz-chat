use async_trait::async_trait;
use sqlx::{Error, PgPool};
use uuid::Uuid;

use super::super::VerificationToken;

#[cfg_attr(test, mockall::automock)]
#[async_trait]
pub trait VerificationTokenRepository: Send + Sync {
    async fn insert(&self, user_id: &str) -> Result<VerificationToken, sqlx::Error>;
}

pub struct VerificationTokenRepositoryImpl {
    pool: PgPool,
}

impl VerificationTokenRepositoryImpl {
    pub fn new(pool: PgPool) -> Self {
        Self {
            pool,
        }
    }
}

#[async_trait]
impl VerificationTokenRepository for VerificationTokenRepositoryImpl {
    async fn insert(&self, user_id: &str) -> Result<VerificationToken, Error> {
        let id = Uuid::new_v4();
        let token = Uuid::new_v4();

        sqlx::query_as::<_, VerificationToken>(
            r#"
            INSERT INTO verification_token (id, token, user_id)
            VALUES ($1, $2, $3)
            RETURNING *
            "#
        )
            .bind(id)
            .bind(token)
            .bind(user_id)
            .fetch_one(&self.pool)
            .await
    }
}