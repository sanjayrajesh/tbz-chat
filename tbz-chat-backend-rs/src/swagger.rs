use std::borrow::Cow;
use actix_files::NamedFile;
use actix_web::{HttpResponse, Responder};
use actix_web::web::{self, Path, ServiceConfig};
use swagger_ui::Assets;

pub fn configure(c: &mut ServiceConfig) {
    c.route("/swagger-ui", web::get().to(index));
    c.route("/swagger-ui/{filename}.{extension}", web::get().to(asset));
    c.route("/api-docs.yaml", web::get().to(spec));
}

async fn spec() -> impl Responder {
    NamedFile::open("resources/api-docs.yaml")
}

async fn index() -> impl Responder {
    HttpResponse::Found().append_header(("Location", "/swagger-ui/index.html")).finish()
}

async fn asset(path: Path<(String, String)>) -> impl Responder {
    let (filename, extension) = path.into_inner();
    let filename = filename + "." + &*extension;

    if let Some(content) = get_asset(filename) {
        let content = content.into_owned();

        match &*extension {
            "html" => HttpResponse::Ok().content_type("text/html").body(content),
            "css" => HttpResponse::Ok().content_type("text/css").body(content),
            "js" => HttpResponse::Ok().content_type("text/javascript;charset=UTF-8").body(content),
            _ => HttpResponse::Ok().body(content),
        }
    } else {
        HttpResponse::NotFound().finish()
    }
}

fn get_asset(name: impl AsRef<str>) -> Option<Cow<'static, [u8]>> {
    Assets::get(name.as_ref())
}
