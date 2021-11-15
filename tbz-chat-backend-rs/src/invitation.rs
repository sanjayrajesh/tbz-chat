use crate::error::InternalError;
use async_trait::async_trait;
use log::debug;
use std::env;
use std::sync::Arc;

use crate::mail::MailService;

static INVITATION_TEMPLATE: &str = include_str!("../resources/invitation.html");

#[cfg_attr(test, mockall::automock)]
#[async_trait]
pub trait InvitationService: Send + Sync {
    async fn invite_user(&self, email: &str, token: &str) -> Result<(), InternalError>;
}

pub struct InvitationServiceImpl {
    mail_service: Arc<MailService>,
    invitation_base_url: String,
    invitation_subject: String,
}

impl InvitationServiceImpl {
    pub fn new(mail_service: Arc<MailService>) -> Self {
        let invitation_base_url =
            env::var("INVITATION_BASE_URL").expect("INVITATION_BASE_URL must be set");
        let invitation_subject =
            env::var("INVITATION_SUBJECT").expect("INVITATION_SUBJECT must be set");
        Self {
            mail_service,
            invitation_base_url,
            invitation_subject,
        }
    }
}

#[async_trait]
impl InvitationService for InvitationServiceImpl {
    async fn invite_user(&self, email: &str, token: &str) -> Result<(), InternalError> {
        let activation_url = self.invitation_base_url.clone() + "/" + token;

        let invitation_text = INVITATION_TEMPLATE
            .replace("%EMAIL%", email)
            .replace("%ACTIVATION_URL%", &*activation_url);

        debug!("Invitation text:\n{}", &invitation_text);

        self.mail_service
            .send(email, self.invitation_subject.clone(), invitation_text)
            .await?;

        Ok(())
    }
}
