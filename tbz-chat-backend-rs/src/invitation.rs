use std::future::Future;
use std::pin::Pin;
use std::sync::Arc;
use actix_utils::future::{err, ok, Ready};
use actix_web::{FromRequest, HttpRequest};
use actix_web::dev::Payload;
use actix_web::web::Data;
use lettre::transport::smtp::authentication::Credentials;
use crate::error::InternalError;
use crate::mail::MailService;
use crate::user::User;
use crate::verification_token::VerificationToken;

pub struct InvitationService {
    mail_service: Arc<MailService>,
}

impl InvitationService {

}

impl FromRequest for InvitationService {
    type Error = InternalError;
    type Future = Ready<Result<Self, Self::Error>>;

    fn from_request(req: &HttpRequest, _payload: &mut Payload) -> Self::Future {
        if let Some(mail_service) = req.app_data::<Data<MailService>>() {
            ok(Self {
                mail_service: mail_service.clone().into_inner(),
            })
        } else {
            err(InternalError::AppData("MailService"))
        }
    }
}
