drop table if exists employees;
drop table if exists roles;
drop table if exists departments;

create table departments (
	id integer auto_increment primary key,
	name varchar(30)
);

create table roles (
	id integer auto_increment primary key,
	title varchar(30),
	salary decimal,
	department_id integer,
	constraint fk_department foreign key (department_id) references departments(id) on delete set null
);

create table employees (
	id integer auto_increment primary key,
	first_name varchar(30),
	last_name varchar(30),
	role_id integer,
	manager_id integer,
	constraint fk_role foreign key (role_id) references roles(id) on delete set null,
	constraint fk_manager foreign key (manager_id) references employees(id) on delete set null
);