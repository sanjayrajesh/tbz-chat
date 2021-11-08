use actix_web::dev::Payload;
use sqlx::PgPool;
use uuid::Uuid;
use log::debug;

#[derive(Debug, sqlx::FromRow)]
pub struct VerificationToken {
    id: String,
    token: String,
    user_id: String,
}

pub async fn create(user_id: &str, pool: &PgPool) -> Result<VerificationToken, sqlx::Error> {
    let id = Uuid::new_v4();
    let token = Uuid::new_v4();

    let verification_token: VerificationToken = sqlx::query_as::<_, VerificationToken>(
        r#"
            INSERT INTO verification_token (id, token, user_id)
            VALUES ($1, $2, $3)
            RETURNING *
            "#
    )
        .bind(id)
        .bind(token)
        .bind(user_id)
        .fetch_one(pool)
        .await?;

    debug!("Created {:?}", &verification_token);

    Ok(verification_token)
}
