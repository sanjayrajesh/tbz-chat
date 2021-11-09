use std::env;
use std::sync::Arc;

use actix_web::web::{Data};
use actix_web::{web, App, HttpServer};
use dotenv::dotenv;
use sqlx::{postgres::PgPoolOptions, PgPool};
use swagger_ui::Assets;

use tbz_chat_backend_rs::invitation::InvitationService;
use tbz_chat_backend_rs::mail::MailService;
use tbz_chat_backend_rs::user;
use tbz_chat_backend_rs::user::UserService;
use tbz_chat_backend_rs::verification_token::VerificationTokenService;
use tbz_chat_backend_rs::swagger;

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
    let mail_service = Arc::new(MailService::new());
    let invitation_service = Arc::new(InvitationService::new(Arc::clone(&mail_service)));
    let verification_token_service = Arc::new(VerificationTokenService::new(pool.clone()));
    let user_service = Arc::new(UserService::new(
        pool.clone(),
        Arc::clone(&invitation_service),
        Arc::clone(&verification_token_service),
    ));

    HttpServer::new(move || {
        App::new()
            .app_data(Data::new(pool.clone()))
            .app_data(Data::from(mail_service.clone()))
            .app_data(Data::from(invitation_service.clone()))
            .app_data(Data::from(verification_token_service.clone()))
            .app_data(Data::from(user_service.clone()))
            .configure(swagger::configure)
            .service(web::resource("/users").route(web::post().to(user::register)))
    })
    .bind("127.0.0.1:7878")?
    .run()
    .await
}
