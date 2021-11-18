pub mod query;

#[derive(Debug, sqlx::FromRow, serde::Serialize)]
pub struct Chat {
    id: String,
    name: String,
}