use std::sync::Arc;

use crate::mail::MailService;

pub struct InvitationService {
    mail_service: Arc<MailService>,
}

impl InvitationService {
    pub fn new(mail_service: Arc<MailService>) -> Self {
        Self { mail_service }
    }
}
