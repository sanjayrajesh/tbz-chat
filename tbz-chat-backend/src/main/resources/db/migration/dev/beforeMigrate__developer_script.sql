drop table if exists user_in_chat;
drop table if exists message;
drop table if exists chat;
drop table if exists verification_token;
drop table if exists users;
drop table if exists role;

create table users
(
    id       character varying(36)  not null unique,
    email    character varying(255) not null,
    username character varying(255),
    password character varying(255),
    enabled  boolean                not null default false,
    constraint pk_users primary key (id)
);

create index users_email on users (email);

create table verification_token
(
    id      character varying(36)  not null unique,
    token   character varying(255) not null unique,
    user_id character varying(36)  not null,
    constraint pk_verification_token primary key (id),
    constraint fk_verification_token_users foreign key (user_id) references users (id)
);

create table chat
(
    id   character varying(36) not null unique,
    name character varying(36) not null unique
);

create table message
(
    id        character varying(36) not null unique,
    body      text                  not null,
    timestamp timestamp             not null default current_timestamp,
    chat_id   character varying(36) not null,
    author_id character varying(36) not null,
    constraint pk_message primary key (id),
    constraint fk_message_chat foreign key (chat_id) references chat (id),
    constraint fk_message_users foreign key (author_id) references users (id)
);

create table role
(
    id   character varying(36)  not null unique,
    name character varying(255) not null unique,
    constraint pk_role primary key (id)
);

create table user_in_chat
(
    id      character varying(36) not null unique,
    chat_id character varying(36) not null,
    user_id character varying(36) not null,
    role_id character varying(36) not null,
    constraint pk_user_in_chat primary key (id),
    constraint fk_user_in_chat_chat foreign key (chat_id) references chat (id),
    constraint fk_user_in_chat_users foreign key (user_id) references users (id),
    constraint fk_user_in_chat_role foreign key (role_id) references role (id),
    constraint user_in_chat_chat_id_user_id unique (chat_id, user_id)
);

insert into role (id, name)
values ('f0337fba-4b72-4490-a236-a3330ce0712a', 'MEMBER'),
       ('70ced881-066a-4e6d-bb52-ed1105c39bde', 'ADMINISTRATOR');

insert into users (id, email, username, password, enabled)
values ('user_1', 'user1@example.com', 'User 1', '$2a$10$L714YQTSEMZoW6MVnZ1Od.XsLA0T/Q8kkFAxpNH2wOKx3sXefh7hu', true),
       ('user_2', 'user2@example.com', 'User 2', '$2a$10$L714YQTSEMZoW6MVnZ1Od.XsLA0T/Q8kkFAxpNH2wOKx3sXefh7hu', true),
       ('user_3', 'user3@example.com', 'User 3', '$2a$10$L714YQTSEMZoW6MVnZ1Od.XsLA0T/Q8kkFAxpNH2wOKx3sXefh7hu', true),
       ('user_4', 'user4@example.com', 'User 4', '$2a$10$L714YQTSEMZoW6MVnZ1Od.XsLA0T/Q8kkFAxpNH2wOKx3sXefh7hu', true);

insert into chat (id, name)
values ('chat_1', 'Chat 1'),
       ('chat_2', 'Chat 2');

insert into user_in_chat (id, chat_id, user_id, role_id)
values ('user_in_chat_1', 'chat_1', 'user_1', '70ced881-066a-4e6d-bb52-ed1105c39bde'),
       ('user_in_chat_2', 'chat_1', 'user_2', 'f0337fba-4b72-4490-a236-a3330ce0712a'),
       ('user_in_chat_3', 'chat_2', 'user_1', 'f0337fba-4b72-4490-a236-a3330ce0712a'),
       ('user_in_chat_4', 'chat_2', 'user_2', '70ced881-066a-4e6d-bb52-ed1105c39bde');