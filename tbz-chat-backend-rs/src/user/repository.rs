use async_trait::async_trait;
use sqlx::{Error, PgPool};
use uuid::Uuid;

use super::User;

#[cfg_attr(test, mockall::automock)]
#[async_trait]
pub trait UserRepository: Send + Sync {
    async fn insert(&self, email: String) -> Result<User, sqlx::Error>;
}

pub struct UserRepositoryImpl {
    pool: PgPool,
}

impl UserRepositoryImpl {
    pub fn new(pool: PgPool) -> Self {
        Self { pool }
    }
}

#[async_trait]
impl UserRepository for UserRepositoryImpl {
    async fn insert(&self, email: String) -> Result<User, Error> {
        let id = Uuid::new_v4();
        let enabled = false;

        sqlx::query_as::<_, User>(
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
        .await
    }
}
