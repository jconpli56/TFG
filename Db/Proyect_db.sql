Create table IF NOT EXISTS pry_user_use(

pk_use_id serial primary key ,
use_gmail  text unique not null ,
use_username text not null,
use_password_hash text not null
)

CREATE TYPE tas_state AS ENUM ('pending','in_progress','completed');
CREATE TYPE tas_type_task AS ENUM ('work','house','personal');

Create table IF NOT EXISTS pry_task_tas(

    pk_tas_id serial primary key ,
    tas_name text not null,
    tas_description text not null,
    tas_state tas_state not null default 'pending',
    tas_type  tas_type_task not null default 'work',
    tas_createdate date default CURRENT_DATE,
    tas_deadline date not null,
    fk_tas_use_id INTEGER REFERENCES pry_user_use(pk_use_id)
)
