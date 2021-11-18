mod repository;

use async_trait::async_trait;
use log::debug;
use sqlx::PgPool;
use repository::{VerificationTokenRepository, VerificationTokenRepositoryImpl};

use super::VerificationToken;

#[cfg_attr(test, mockall::automock)]
#[async_trait]
pub trait VerificationTokenService: Send + Sync {
    async fn create(&self, user_id: &str) -> Result<VerificationToken, sqlx::Error>;
}

pub struct VerificationTokenServiceImpl<R: VerificationTokenRepository> {
    repository: R,
}

impl VerificationTokenServiceImpl<VerificationTokenRepositoryImpl> {
    pub fn new(pool: PgPool) -> Self {
        Self {
            repository: VerificationTokenRepositoryImpl::new(pool),
        }
    }
}

#[async_trait]
impl<R: VerificationTokenRepository> VerificationTokenService for VerificationTokenServiceImpl<R> {
    async fn create(&self, user_id: &str) -> Result<VerificationToken, sqlx::Error> {
        let verification_token = self.repository.insert(user_id).await?;

        debug!("Created {:?}", &verification_token);

        Ok(verification_token)
    }
}