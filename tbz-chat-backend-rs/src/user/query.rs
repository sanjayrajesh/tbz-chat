use sqlx::query_as;
use uuid::Uuid;
use crate::util::QueryAs;

#[derive(Debug, sqlx::FromRow, serde::Serialize)]
pub struct DisabledUser {
    pub id: String,
    pub email: String,
}

impl DisabledUser {
    pub fn insert(email: &str) -> QueryAs<Self> {
        let id = Uuid::new_v4();

        query_as(
            r#"
        INSERT INTO users (id, email, enabled)
        VALUES ($1, $2, $3)
        "#
        )
            .bind(id)
            .bind(email)
            .bind(false)
    }
}

#[derive(Debug, PartialEq, Clone, sqlx::FromRow)]
pub struct EnabledUser {
    pub id: String,
    pub email: String,
    pub username: Option<String>,
    pub password: String,
}

impl EnabledUser {
    pub fn find_by_email(email: &str) -> QueryAs<Self> {
        query_as("SELECT * FROM users WHERE email = $1 AND enabled = true").bind(email)
    }

    pub fn find_by_id(id: &str) -> QueryAs<Self> {
        query_as("SELECT * FROM users WHERE id = $1 AND enabled = true").bind(id)
    }
}

#[derive(Debug, sqlx::FromRow, serde::Serialize)]
pub struct UserWithRole {
    id: String,
    email: String,
    username: Option<String>,
    role: String,
}

impl UserWithRole {
    pub fn find_all_by_chat_id(chat_id: &str) -> QueryAs<Self> {
        query_as(r#"
        SELECT u.*, r.name AS role
        FROM users u
        JOIN user_in_chat uic ON uic.user_id = u.id
        JOIN role r ON uic.role_id = r.id
        WHERE uic.chat_id = $1
        "#)
            .bind(chat_id)
    }
}