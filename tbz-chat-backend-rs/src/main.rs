mod chat;
mod error;
mod invitation;
mod mail;
mod message;
mod role;
mod user;
mod user_in_chat;
mod verification_token;
mod authentication;
mod util;

use std::env;
use std::sync::Arc;

use crate::invitation::InvitationServiceImpl;
use crate::mail::MailServiceImpl;
use crate::user::{UserService, UserServiceImpl};
use crate::verification_token::VerificationTokenServiceImpl;
use actix_web::web::Data;
use actix_web::{web, App, HttpServer};
use actix_web_swagger_ui::swagger;
use dotenv::dotenv;
use sqlx::{postgres::PgPoolOptions, PgPool};
use swagger_ui::{Config, Spec};
use crate::authentication::{AuthenticationService, AuthenticationServiceImpl};

async fn create_pool(url: &str) -> PgPool {
    let pool = PgPoolOptions::new().connect(url).await;

    match pool {
        Ok(pool) => {
            sqlx::query!("select * from users")
                .fetch_optional(&pool)
                .await
                .expect("Unable to obtain database connection");

            pool
        }
        Err(err) => {
            eprintln!("Unable to create db pool: {}", err);
            std::process::exit(1);
        }
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    env_logger::init();

    let db_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let pool = create_pool(&db_url).await;
    let mail_service = Arc::new(MailServiceImpl::new());
    let invitation_service = Arc::new(InvitationServiceImpl::new(Arc::clone(&mail_service)));
    let verification_token_service = Arc::new(VerificationTokenServiceImpl::new(pool.clone()));
    let user_service = Arc::new(UserServiceImpl::new(
        pool.clone(),
        Arc::clone(&invitation_service),
        Arc::clone(&verification_token_service),
    ));
    let authentication_service = Arc::new(AuthenticationServiceImpl::new(Arc::clone(&user_service)));

    let api_docs_content: &'static [u8] = include_bytes!("../resources/api-docs.yaml");

    HttpServer::new(move || {
        let spec = Spec {
            name: "api-docs.yaml".to_string(),
            content: api_docs_content,
        };

        let config = Config {
            url: "/swagger-ui/api-docs.yaml".into(),
            ..Config::default()
        };

        App::new()
            .app_data(Data::new(pool.clone()))
            .app_data(Data::from(mail_service.clone()))
            .app_data(Data::from(invitation_service.clone()))
            .app_data(Data::from(verification_token_service.clone()))
            .app_data(Data::from(user_service.clone() as Arc<dyn UserService>))
            .app_data(Data::from(authentication_service.clone() as Arc<dyn AuthenticationService>))
            .service(web::scope("/swagger-ui").configure(swagger(spec, config)))
            .service(
                web::resource("/users")
                    .route(web::post().to(user::register))
            )
            .route("/login", web::post().to(authentication::login))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
