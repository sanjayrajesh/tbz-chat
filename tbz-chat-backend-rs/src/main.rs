use actix_web::{web, App, HttpServer};

use actix_web::web::Data;
use dotenv::dotenv;
use sqlx::{postgres::PgPoolOptions, PgPool};
use std::env;
use tbz_chat_backend_rs::{mail, user};

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

    HttpServer::new(move || {
        App::new()
            .app_data(Data::new(pool.clone()))
            .app_data(Data::new(mail::load_credentials()))
            .service(web::resource("/users").route(web::post().to(user::register)))
    })
    .bind("127.0.0.1:7878")?
    .run()
    .await
}
