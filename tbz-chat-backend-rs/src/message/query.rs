use chrono::NaiveDateTime;
use sqlx::query_as;
use crate::util::QueryAs;

#[derive(Debug, sqlx::FromRow)]
pub struct Message {
    pub(crate) id: String,
    pub body: String,
    pub timestamp: NaiveDateTime,
    pub chat_id: String,
    pub author_id: String,
}

impl Message {
    pub fn find_all_by_chat_id(chat_id: &str) -> QueryAs<Self> {
        query_as(r#"
        SELECT * FROM message WHERE chat_id = $1
        "#)
            .bind(chat_id)
    }
}