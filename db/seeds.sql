insert into departments (name)
values
	('Engineering'),
	('Accounting'),
	('Quality'),
	('Sales'),
	('Production');
	
insert into roles (title, salary, department_id)
values
	('Front End Dev', 60000, 1),
	('Back End Dev', 70000, 1),
	('Accountant', 50000, 2),
	('Quality Control', 40000, 3),
	('Salesperson', 60000, 4),
	('Marketer', 70000, 4),
	('Manufacturer', 45000, 5),
	('Shift Lead', 50000, 5),
	('Maintenance', 45000, 5);
	
insert into employees (first_name, last_name, role_id, manager_id)
values
	('Kelneiros', 'Umegeiros',  2, 1),
	('Cloud',     'Aven',       1, 2),
	('Fifis',     'Dilo',       7, 2),
	('Thurram',   'Steelforge', 7, 3),
	('Pax',       'Mirx',       2, 5),
	('Hornur',    'Gravelord',  2, 5),
	('Bhalnik',   'Doomstone',  3, 5),
	('Nok',       'Fits',       5, 6),
	('Rout',      'Wog',        9, 6),
	('Tintis',    'Kontos',     5, 7),
	('Yinkian',   'Wyonoac',    3, 8),
	('Purs',      'Uk',         4, 10),
	('Nelly',     'Tiger',      7, 11),
	('Bundus',    'Bright',     8, 12),
	('Thelnar',   'Ragemantle', 4, 13),
	('Bik',       'Seats',      6, 13),
	('Neretis',   'Fynias',     5, 14),
	('Wuguallon', 'Briomuyre',  6, 17),
	('Tefinon',   'Ykevis',     2, 19),
	('Tentivan',  'Deonos',     4, 19),
	('Hurgram',   'Stoutward',  8, 19)