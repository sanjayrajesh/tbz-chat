use std::borrow::Cow;

use actix_files::file_extension_to_mime;
use actix_utils::future::{ok};
use actix_web::http::header::{ContentType, LOCATION};
use actix_web::web::{self, ServiceConfig};
use actix_web::{HttpRequest, HttpResponse, Responder, Route};
use serde::Serialize;
use swagger_ui::{Assets, Config, Spec};

fn assets_iter() -> impl Iterator<Item = Cow<'static, str>> {
    Assets::iter()
}

fn get_asset(name: impl AsRef<str>) -> Option<Cow<'static, [u8]>> {
    Assets::get(name.as_ref())
}

pub fn swagger(spec: Spec, config: Config) -> impl FnOnce(&mut ServiceConfig) {
    let spec_content_type = content_type(&spec.name);

    let mut asset_routes = vec![];

    for file in assets_iter() {
        let filename = file.as_ref();
        let content_type = content_type(filename);
        let content = get_asset(filename).unwrap().into_owned();

        asset_routes.push((format!("/{}", filename), body(content_type, content)));
    }

    move |c| {
        c.route("", web::route().to(index));

        c.route(&spec.name, body(spec_content_type, Vec::from(spec.content)));
        c.route("/swagger-ui-config.json", json(config));

        for (path, route) in asset_routes {
            c.route(path.as_str(), route);
        }
    }
}

async fn index(req: HttpRequest) -> impl Responder {
    let path = req.path();

    let config_url = format!("{}/swagger-ui-config.json", path);
    let index_url = format!("{}/index.html?configUrl={}", path, config_url);

    HttpResponse::Found()
        .append_header((LOCATION, index_url))
        .finish()
}

fn body(content_type: ContentType, content: Vec<u8>) -> Route {
    let handler = move || {
        ok::<_, actix_web::Error>(
            HttpResponse::Ok()
                .content_type(content_type.clone())
                .body(content.clone()),
        )
    };

    web::to(handler)
}

fn json(json: impl Serialize + Clone + 'static) -> Route {
    let handler = move || ok::<_, actix_web::Error>(HttpResponse::Ok().json(json.clone()));

    web::to(handler)
}

fn content_type(filename: impl AsRef<str>) -> ContentType {
    let mime = file_extension_to_mime(extension(filename.as_ref()));

    ContentType(mime)
}

fn extension(filename: &str) -> &str {
    if let Some(dot_index) = filename.rfind('.') {
        &filename[dot_index + 1..]
    } else {
        ""
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn extension_works() {
        assert_eq!("html", extension("index.html"));
        assert_eq!("js", extension("jquery.min.js"));
        assert_eq!("", extension("index"));
    }
}
