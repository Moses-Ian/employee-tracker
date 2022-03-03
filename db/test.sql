update employees, (
	select employees.id
	from employees
	where first_name = '${managerFirst}' and last_name = '${managerLast}') as manager
set employees.manager_id = manager.id
where first_name = '${first}' and last_name = '${last}';






