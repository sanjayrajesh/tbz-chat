use async_trait::async_trait;
use futures::{TryStreamExt, future::join};
use sqlx::{Error, PgPool};
use crate::chat::query::ChatWithRole;
use crate::message::query::Message;
use crate::user::query::{DisabledUser, EnabledUser, UserWithRole};
use crate::user::response;

#[cfg_attr(test, mockall::automock)]
#[async_trait]
pub trait UserRepository: Send + Sync {
    async fn find_by_email(&self, email: &str) -> Result<Option<EnabledUser>, sqlx::Error>;

    async fn insert(&self, email: &str) -> Result<DisabledUser, sqlx::Error>;

    async fn load_response(&self, user: EnabledUser) -> Result<response::UserResponse, sqlx::Error>;
}

pub struct UserRepositoryImpl {
    pub pool: PgPool,
}

#[async_trait]
impl UserRepository for UserRepositoryImpl {
    async fn find_by_email(&self, email: &str) -> Result<Option<EnabledUser>, Error> {
        EnabledUser::find_by_email(email).fetch_optional(&self.pool).await
    }

    async fn insert(&self, email: &str) -> Result<DisabledUser, Error> {
        DisabledUser::insert(email).fetch_one(&self.pool).await
    }

    async fn load_response(&self, user: EnabledUser) -> Result<response::UserResponse, Error> {
        let chats = self.load_chats(&user.id).await?;

        let EnabledUser {
            id,
            email,
            username,
            ..
        } = user;

        let response = response::UserResponse {
            id,
            email,
            username,
            chats,
        };

        Ok(response)
    }
}

impl UserRepositoryImpl {
    async fn load_chats(&self, user_id: &str) -> Result<Vec<response::Chat>, sqlx::Error> {
        ChatWithRole::find_all_by_user_id(user_id)
            .fetch(&self.pool)
            .and_then(|chat| self.load_users_and_messages(chat))
            .try_collect::<Vec<_>>()
            .await
    }

    async fn load_users_and_messages(&self, chat: ChatWithRole) -> Result<response::Chat, sqlx::Error> {
        let users = self.load_users(&chat.id);
        let messages = self.load_messages(&chat.id);

        let (users, messages) = join(users, messages).await;

        let users = users?;
        let messages = messages?;

        let ChatWithRole {
            id,
            name,
            role,
        } = chat;

        let chat = response::Chat {
            id,
            name,
            role,
            users,
            messages,
        };

        Ok(chat)
    }

    async fn load_users(&self, chat_id: &str) -> Result<Vec<UserWithRole>, sqlx::Error> {
        UserWithRole::find_all_by_chat_id(chat_id)
            .fetch_all(&self.pool)
            .await
    }

    async fn load_messages(&self, chat_id: &str) -> Result<Vec<response::Message>, sqlx::Error> {
        Message::find_all_by_chat_id(chat_id)
            .fetch(&self.pool)
            .and_then(|message| self.load_author(message))
            .try_collect::<Vec<_>>()
            .await
    }

    async fn load_author(&self, message: Message) -> Result<response::Message, sqlx::Error> {
        let user = EnabledUser::find_by_id(&message.author_id).fetch_one(&self.pool).await?;

        let EnabledUser {
            id,
            email,
            username,
            ..
        } = user;

        let author = response::Author {
            id,
            email,
            username,
        };

        let Message {
            id,
            body,
            timestamp,
            ..
        } = message;

        let timestamp = timestamp.to_string();

        let message = response::Message {
            id,
            body,
            timestamp,
            author,
        };

        Ok(message)
    }
}