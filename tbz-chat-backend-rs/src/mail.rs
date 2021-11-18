use std::env;

use async_trait::async_trait;
use lettre::message::SinglePart;
use lettre::transport::smtp::authentication::Credentials;
use lettre::{AsyncSmtpTransport, AsyncTransport, Message, Tokio1Executor};

use crate::error::InternalError;

#[cfg_attr(test, mockall::automock)]
#[async_trait]
pub trait MailService: Send + Sync {
    async fn send(&self, to: &str, subject: String, html: String) -> Result<(), InternalError>;
}

pub struct MailServiceImpl {
    credentials: Credentials,
    from: String,
}

impl MailServiceImpl {
    pub fn new() -> Self {
        let username = env::var("MAIL_USERNAME").expect("MAIL_USERNAME must be set");
        let password = env::var("MAIL_PASSWORD").expect("MAIL_PASSWORD must be set");

        let credentials = Credentials::new(username, password);
        let from = env::var("MAIL_FROM").expect("MAIL_FROM must be set");

        Self { credentials, from }
    }
}

#[async_trait]
impl MailService for MailServiceImpl {
    async fn send(&self, to: &str, subject: String, html: String) -> Result<(), InternalError> {
        let message = Message::builder()
            .from(self.from.parse().unwrap())
            .to(to.parse().unwrap())
            .subject(subject)
            .singlepart(SinglePart::html(html))?;

        let mailer = AsyncSmtpTransport::<Tokio1Executor>::relay("smtp.gmail.com")?;
        let mailer = mailer.credentials(self.credentials.clone()).build();

        mailer.send(message).await?;

        Ok(())
    }
}

impl Default for MailServiceImpl {
    fn default() -> Self {
        Self::new()
    }
}
