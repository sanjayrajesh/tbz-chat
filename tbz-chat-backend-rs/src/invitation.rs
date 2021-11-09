use std::sync::Arc;
use std::env;
use log::debug;
use crate::error::InternalError;

use crate::mail::MailService;
use crate::user::User;
use crate::verification_token::VerificationToken;

static INVITATION_TEMPLATE: &'static str = include_str!("../resources/invitation.html");

pub struct InvitationService {
    mail_service: Arc<MailService>,
    invitation_base_url: String,
    invitation_subject: String,
}

impl InvitationService {
    pub fn new(mail_service: Arc<MailService>) -> Self {
        let invitation_base_url = env::var("INVITATION_BASE_URL").expect("INVITATION_BASE_URL must be set");
        let invitation_subject = env::var("INVITATION_SUBJECT").expect("INVITATION_SUBJECT must be set");
        Self { mail_service, invitation_base_url, invitation_subject }
    }

    pub async fn invite_user(&self, user: &User, token: &VerificationToken) -> Result<(), InternalError> {
        let activation_url = self.invitation_base_url.clone() + "/" + &token.token;

        let invitation_text = INVITATION_TEMPLATE
            .replace("%EMAIL%", &*user.email)
            .replace("%ACTIVATION_URL%", &*activation_url);

        debug!("Invitation text:\n{}", &invitation_text);

        self.mail_service.send(&*user.email, self.invitation_subject.clone(), invitation_text).await?;

        Ok(())
    }
}
