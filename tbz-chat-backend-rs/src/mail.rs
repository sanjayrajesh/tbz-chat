use std::env;

use lettre::message::SinglePart;
use lettre::transport::smtp::authentication::Credentials;
use lettre::{AsyncSmtpTransport, AsyncTransport, Message, Tokio1Executor};

use crate::error::InternalError;

pub struct MailService {
    credentials: Credentials,
    from: String,
}

impl MailService {
    pub fn new() -> Self {
        let username = env::var("MAIL_USERNAME").expect("MAIL_USERNAME must be set");
        let password = env::var("MAIL_PASSWORD").expect("MAIL_PASSWORD must be set");

        let credentials = Credentials::new(username, password);
        let from = env::var("MAIL_FROM").expect("MAIL_FROM must be set");

        Self { credentials, from }
    }

    pub async fn send(&self, to: &str, subject: String, html: String) -> Result<(), InternalError> {
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

impl Default for MailService {
    fn default() -> Self {
        Self::new()
    }
}
