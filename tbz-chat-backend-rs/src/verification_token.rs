use async_trait::async_trait;
use log::debug;
use sqlx::PgPool;
use uuid::Uuid;

#[derive(Debug, sqlx::FromRow, Clone)]
pub struct VerificationToken {
    pub id: String,
    pub token: String,
    pub user_id: String,
}

#[cfg_attr(test, mockall::automock)]
#[async_trait]
pub trait VerificationTokenService: Send + Sync {
    async fn create(&self, user_id: &str) -> Result<VerificationToken, sqlx::Error>;
}

pub struct VerificationTokenServiceImpl {
    pool: PgPool,
}

impl VerificationTokenServiceImpl {
    pub fn new(pool: PgPool) -> Self {
        Self { pool }
    }
}

#[async_trait]
impl VerificationTokenService for VerificationTokenServiceImpl {
    async fn create(&self, user_id: &str) -> Result<VerificationToken, sqlx::Error> {
        let id = Uuid::new_v4();
        let token = Uuid::new_v4();

        let verification_token: VerificationToken = sqlx::query_as::<_, VerificationToken>(
            r#"
            INSERT INTO verification_token (id, token, user_id)
            VALUES ($1, $2, $3)
            RETURNING *
            "#,
        )
        .bind(id)
        .bind(token)
        .bind(user_id)
        .fetch_one(&self.pool)
        .await?;

        debug!("Created {:?}", &verification_token);

        Ok(verification_token)
    }
}
