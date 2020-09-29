drop table if exists user_in_chat;
drop table if exists message;
drop table if exists chat;
drop table if exists verification_token;
drop table if exists users;

create table users (
    id character varying (36) not null unique,
    email character varying (255) not null,
    username character varying (255),
    password character varying (255),
    enabled boolean not null default false,
    constraint pk_users primary key (id)
);

create table verification_token (
                                    id character varying (36) not null unique,
                                    token character varying (255) not null unique,
                                    user_id character varying (36) not null,
                                    constraint pk_verification_token primary key (id),
                                    constraint fk_verification_token_users foreign key (user_id) references users (id)
);

create table chat (
                      id character varying (36) not null unique,
                      name character varying (36) not null unique
);

create table message (
                         id character varying (36) not null unique,
                         body text not null,
                         timestamp timestamp not null default current_timestamp,
                         chat_id character varying (36) not null,
                         author_id character varying (36) not null,
                         constraint pk_message primary key (id),
                         constraint fk_message_chat foreign key (chat_id) references chat (id),
                         constraint fk_message_users foreign key (author_id) references users (id)
);

create table user_in_chat (
    chat_id character varying (36) not null,
    user_id character varying (36) not null,
    constraint fk_user_in_chat_chat foreign key (chat_id) references chat (id),
    constraint fk_user_in_chat_users foreign key (user_id) references users (id),
    constraint user_in_chat_chat_id_user_id unique (chat_id, user_id)
);