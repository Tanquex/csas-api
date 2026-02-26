create table users(
    id smallint not null prymary key auto_increment,
    name varchar(150) not null,
    lastname varchar(250) not null,

);

create table tasks(
     id smallint not null prymary key auto_increment,
     name varchar(150) not null,
     description varchar(250) not null, 
     priority boolean not null,
     user_id smallint not null,
     foreign key (user_id) references users(id)
);

--insertar 2 tareas 

---Posgres
create table users(
    id serial not null prymary key auto_increment,
    name varchar(150) not null,
    lastname varchar(250) not null,

);

create table tasks(
     id serial not null prymary key auto_increment,
     name varchar(150) not null,
     description varchar(250) not null, 
     priority bool not null,
     user_id integer references users(id)
);



insert into users(name, lastname) values('Samael', 'Aguayo');

insert into tasks(name, description, priority, user_id) values('Task One', 'Descripcion ', true, 1);
insert into tasks(name, description, priority, user_id) values('Task two', 'Descripcion de otra 2', true, 1); 