use serde::Serialize;
use crate::user::query::UserWithRole;

#[derive(Debug, Serialize)]
pub struct UserResponse {
    pub id: String,
    pub email: String,
    pub username: Option<String>,
    pub chats: Vec<Chat>,
}

#[derive(Debug, Serialize)]
pub struct Chat {
    pub id: String,
    pub name: String,
    pub role: String,
    pub messages: Vec<Message>,
    pub users: Vec<UserWithRole>,
}

#[derive(Debug, Serialize)]
pub struct Message {
    pub id: String,
    pub body: String,
    pub timestamp: String,
    pub author: Author,
}

#[derive(Debug, Serialize)]
pub struct Author {
    pub id: String,
    pub email: String,
    pub username: Option<String>,
}