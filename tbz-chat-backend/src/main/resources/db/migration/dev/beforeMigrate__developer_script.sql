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
values ('member', 'MEMBER'),
       ('administrator', 'ADMINISTRATOR');

insert into users (id, email, username, password, enabled)
values ('spectator', 'spectator@cinema.com', 'Spectator', '$2a$10$L714YQTSEMZoW6MVnZ1Od.XsLA0T/Q8kkFAxpNH2wOKx3sXefh7hu', true),
       ('kenobi', 'kenobi@republic.com', 'Obi-Wan Kenobi', '$2a$10$L714YQTSEMZoW6MVnZ1Od.XsLA0T/Q8kkFAxpNH2wOKx3sXefh7hu', true),
       ('grievous', 'grievous@seperatist.com', 'General Grievous', '$2a$10$L714YQTSEMZoW6MVnZ1Od.XsLA0T/Q8kkFAxpNH2wOKx3sXefh7hu', true),
       ('windu', 'windu@republic.com', 'Mace Windu', '$2a$10$L714YQTSEMZoW6MVnZ1Od.XsLA0T/Q8kkFAxpNH2wOKx3sXefh7hu', true),
       ('sidious', 'sidious@sith.com', 'Darth Sidious', '$2a$10$L714YQTSEMZoW6MVnZ1Od.XsLA0T/Q8kkFAxpNH2wOKx3sXefh7hu', true);

insert into chat (id, name)
values ('utapau', 'Utapau'),
       ('coruscant', 'Coruscant');

insert into user_in_chat (id, chat_id, user_id, role_id)
values ('utapau_spectator', 'utapau', 'spectator', 'administrator'),
       ('utapau_kenobi', 'utapau', 'kenobi', 'member'),
       ('utapau_grievous', 'utapau', 'grievous', 'member'),
       ('coruscant_spectator', 'coruscant', 'spectator', 'administrator'),
       ('coruscant_windu', 'coruscant', 'windu', 'member'),
       ('coruscant_sidious', 'coruscant', 'sidious', 'member');

insert into message (id, body, chat_id, author_id, timestamp)
values ('message_1', 'Hello there!', 'utapau', 'kenobi', '2020-10-09 12:30:00'),
       ('message_2', 'General Kenobi!', 'utapau', 'grievous', '2020-10-09 12:31:00'),
       ('message_3', 'The senate will decide your fate', 'coruscant', 'windu', '2020-10-09 12:32:00'),
       ('message_4', 'I AM the senate!', 'coruscant', 'sidious', '2020-10-09 12:33:00');