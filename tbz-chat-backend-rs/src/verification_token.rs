use log::debug;
use sqlx::PgPool;
use uuid::Uuid;

#[derive(Debug, sqlx::FromRow)]
pub struct VerificationToken {
    id: String,
    token: String,
    user_id: String,
}

pub struct VerificationTokenService {
    pool: PgPool,
}

impl VerificationTokenService {
    pub fn new(pool: PgPool) -> Self {
        Self { pool }
    }

    pub async fn create(&self, user_id: &str) -> Result<VerificationToken, sqlx::Error> {
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
