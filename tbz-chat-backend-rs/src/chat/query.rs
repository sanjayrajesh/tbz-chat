use sqlx::query_as;
use crate::util::QueryAs;

#[derive(Debug, sqlx::FromRow)]
pub struct ChatWithRole {
    pub id: String,
    pub name: String,
    pub role: String,
}

impl ChatWithRole {

    pub fn find_all_by_user_id(user_id: &str) -> QueryAs<Self> {
        query_as(r#"
        SELECT c.id, c.name, r.name AS role
        FROM chat c
        JOIN user_in_chat uic ON uic.chat_id = c.id
        JOIN role r ON uic.role_id = r.id
        WHERE uic.user_id = $1
        "#)
            .bind(user_id)
    }

}