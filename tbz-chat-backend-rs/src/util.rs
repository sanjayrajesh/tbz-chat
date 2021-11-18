use sqlx::database::HasArguments;
use sqlx::Postgres;

pub type QueryAs<'a, T> = sqlx::query::QueryAs<'a, Postgres, T, <Postgres as HasArguments<'a>>::Arguments>;