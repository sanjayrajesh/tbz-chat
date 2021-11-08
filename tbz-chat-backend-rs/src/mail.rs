use std::env;

use lettre::transport::smtp::authentication::Credentials;
use lettre::{AsyncSmtpTransport, AsyncTransport, Message, Tokio1Executor};

use crate::error::InternalError;

#[derive(Clone)]
pub struct MailService {
    credentials: Credentials,
}

impl MailService {
    pub fn new() -> Self {
        let username = env::var("MAIL_USERNAME").expect("MAIL_USERNAME must be set");
        let password = env::var("MAIL_PASSWORD").expect("MAIL_PASSWORD must be set");

        let credentials = Credentials::new(username, password);

        Self { credentials }
    }

    pub async fn send(&self, to: &str, subject: String, body: String) -> Result<(), InternalError> {
        let from = env::var("MAIL_FROM").expect("MAIL_FROM must be set");

        let message = Message::builder()
            .from(from.parse().unwrap())
            .to(to.parse().unwrap())
            .subject(subject)
            .body(body)?;

        let mailer = AsyncSmtpTransport::<Tokio1Executor>::relay("smtp.gmail.com")?;
        let mailer = mailer.credentials(self.credentials.clone()).build();

        mailer.send(message).await?;

        Ok(())
    }
}
