const selectEmployeeNames = `select first_name, last_name from employees;`;
const selectDepartmentNames = `select name from departments;`;
const selectRoleTitles = `select title from roles;`;
const selectManagerNames = 
`select distinct em.first_name, em.last_name
from employees e
inner join employees em 
on e.manager_id = em.id;`;
const selectAllEmployees = 
`select e.id, e.first_name, e.last_name,
r.title, r.salary,
d.name as department,
em.last_name as manager
from employees e
left join roles r
on e.role_id = r.id
left join departments d
on r.department_id = d.id
left join employees em
on e.manager_id = em.id;`;
const selectAllDepartments = 
`select employees.id, employees.first_name, employees.last_name, roles.title
from departments
inner join roles 
on departments.id = roles.department_id
inner join employees
on roles.id = employees.role_id
where departments.name = ?;`;
const selectManager = 
`select employees.id, employees.first_name, employees.last_name
from employees
left join employees em
on employees.manager_id = em.id
where em.first_name = ? and em.last_name = ?;`;
const selectSalary =
`select roles.salary
from departments
inner join roles 
on departments.id = roles.department_id
inner join employees
on roles.id = employees.role_id
where departments.name = ?;`;
const addDepartment = `insert into departments (name) values (?);`;
const addRole = 
`insert into roles (title, salary, department_id)
select ?, ?, departments.id
from departments
where departments.name = ?;`;
const addEmployee =
`insert into employees (first_name, last_name, role_id, manager_id)
select ?, ?, roles.id, (
	select employees.id
	from employees
	where first_name = ? and last_name = ? )
from roles
where roles.title = ?;`;
const updateEmployeeRole =
`update employees, (
	select roles.id
	from roles
	where roles.title = ?) as src
set employees.role_id = src.id
where first_name = ? and last_name = ?;`;
const updateEmployeeManager =
`update employees, (
	select employees.id
	from employees
	where first_name = ? and last_name = ?) as manager
set employees.manager_id = manager.id
where first_name = ? and last_name = ?;`;
const deleteDepartment = `delete from departments where name = ?;`;
const deleteRole = `delete from roles where title = ?;`;
const deleteEmployee = 
`delete from employees 
where first_name = ? and last_name = ?;`;

module.exports = {
	selectEmployeeNames,
	selectDepartmentNames,
	selectRoleTitles,
	selectManagerNames,
	selectAllEmployees,
	selectAllDepartments,
 	selectManager,
	selectSalary,
	addDepartment,
	addRole,
	addEmployee,
	updateEmployeeRole,
	updateEmployeeManager,
	deleteDepartment,
	deleteRole,
	deleteEmployee
}