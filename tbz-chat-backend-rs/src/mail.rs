use lettre::transport::smtp::authentication::Credentials;
use std::env;
use std::future::Future;
use std::pin::Pin;
use std::sync::Arc;
use actix_web::{FromRequest, HttpRequest};
use actix_web::dev::Payload;
use actix_web::web::Data;
use actix_utils::future::{err, ok, Ready};
use lettre::{AsyncSmtpTransport, AsyncTransport, Message, Tokio1Executor};
use crate::error::InternalError;

pub fn load_credentials() -> Credentials {
    let username = env::var("MAIL_USERNAME").expect("MAIL_USERNAME must be set");
    let password = env::var("MAIL_PASSWORD").expect("MAIL_PASSWORD must be set");

    Credentials::new(username, password)
}

#[derive(Clone)]
pub struct MailService {
    credentials: Arc<Credentials>,
}

impl MailService {
    pub async fn send(&self, to: &str, subject: String, body: String) -> Result<(), InternalError> {
        let from = env::var("MAIL_FROM").expect("MAIL_FROM must be set");

        let message = Message::builder()
            .from(from.parse().unwrap())
            .to(to.parse().unwrap())
            .subject(subject)
            .body(body)?;

        let mailer = AsyncSmtpTransport::<Tokio1Executor>::relay("smtp.gmail.com")?;
        let mailer = mailer.credentials(self.credentials.as_ref().clone()).build();

        mailer.send(message).await?;

        Ok(())
    }
}

impl FromRequest for MailService {
    type Error = InternalError;
    type Future = Ready<Result<Self, Self::Error>>;

    fn from_request(req: &HttpRequest, _payload: &mut Payload) -> Self::Future {
        if let Some(credentials) = req.app_data::<Data<Credentials>>() {
            ok(Self {
                credentials: credentials.clone().into_inner(),
            })
        } else {
            err(InternalError::AppData("Credentials"))
        }
    }
}
