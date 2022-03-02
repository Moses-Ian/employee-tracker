const inquirer = require('inquirer');
const { validate } = require('./utils/utils');
const cTable = require('console.table');

//connect to mysql database
const db = require('./db/connection');

//build questions here
const actionQuestion = [{
	type: 'input',
	name: 'action',
	message: 'What would you like to do?'
}];
	
const addDepartmentQuestion = [{
	type: 'input',
	name: 'name',
	message: 'What is the name of the new department?'
}];

const addRoleQuestions = [
	{
		type: 'input',
		name: 'title',
		message: 'What is the title of the new role?'
	}, {
		type: 'number',
		name: 'salary',
		message: 'What is the salary of the new role?',
		validate: input => {
			if (isNaN(input)) 
				return 'Salary must be a number!';
			return true;
		}
	}
];

const addEmployeeQuestions = [
	{
		type: 'input',
		name: 'first',
		message: "What is the new employee's first name?"
	}, {
		type: 'input',
		name: 'last',
		message: 'Last name?'
	}, {
		type: 'number',
		name: 'role',
		message: 'Role ID?',
		validate: input => {
			if (isNaN(input)) 
				return 'Role ID must be a number!';
			return true;
		}
	}, {
		type: 'number',
		name: 'manager',
		message: 'Manager ID?',
		validate: input => {
			if (isNaN(input)) 
				return 'Manager ID must be a number!';
			return true;
		}
	}
];

let chooseEmployeeQuestion = [{
		type: 'list',
		name: 'employee',
		message: "Which employee's role do you want to update?",
		choices: []
}];

let chooseDepartmentQuestion = [{
		type: 'list',
		name: 'department',
		message: "Which department?",
		choices: []
}];

let chooseRoleQuestion = [{
		type: 'list',
		name: 'title',
		message: "Which role?",
		choices: []
}];

let chooseManagerQuestion = [{
		type: 'list',
		name: 'manager',
		message: "Which manager?",
		choices: []
}];

let updateRoleQuestion = [
	{
		type: 'number',
		name: 'role',
		message: "What is this employee's new role's ID?",
		validate: input => {
			if (isNaN(input)) 
				return 'Role ID must be a number!';
			return true;
		}
	}
];
	
let updateManagerQuestion = [
	{
		type: 'number',
		name: 'manager',
		message: "What is this employee's new manager's ID?",
		validate: input => {
			if (isNaN(input)) 
				return 'Manager ID must be a number!';
			return true;
		}
	}
];
	
//functions
const promptUser = () => {
  return inquirer.prompt(actionQuestion);
}

const addQuery = (sql) => {
	db.promise().query(sql)
	.then(result => console.log("Query OK"))
	// .catch(err => console.log("Query didn't work (you know what you did)."))
	.catch(err => console.log(err))
	.then(db.end());
}

const getQuery = (sql) => {
	db.promise().query(sql)
		.then(results => console.table(results[0]))
		.catch(err => console.log(err))
		.then(db.end());
}

const getEmployeeNames = () => {
	sql = `select first_name, last_name from employees;`;
	return db.promise().query(sql)
	.then(results => {
		const names = results[0].map(r => `${r.first_name} ${r.last_name}`);
		chooseEmployeeQuestion[0].choices = names;
	});
}

const getDepartmentNames = () => {
	sql = `select name from departments;`;
	return db.promise().query(sql)
	.then(results => {
		const names = results[0];
		chooseDepartmentQuestion[0].choices = names;
	});
}

const getRoleNames = () => {
	sql = `select title from roles;`;
	return db.promise().query(sql)
	.then(results => {
		const titles = results[0];
		chooseRoleQuestion[0].choices = titles.map(r => r.title);
	});
}

const getManagerNames = () => {
	sql = `select distinct em.first_name, em.last_name
		from employees e
		inner join employees em 
		on e.manager_id = em.id;`;
	return db.promise().query(sql)
	.then(results => {
		const names = results[0].map(r => `${r.first_name} ${r.last_name}`);
		chooseManagerQuestion[0].choices = names;
	});
}

//body

//returns a promise
console.log(`You can:
view all departments
view all roles
view all employees
add department
add role
add employee
update employee role
update employee manager
view manager
view department
view budget
delete department
delete role
delete employee`);

promptUser()	// returns a promise
	.then(answers => {
		let { action } = answers;
		action = action.trim().toLowerCase().split(' ');
		if (!validate(action))
			return;
		switch(action[0]) {
			case 'view':
				switch (action[1]) {
					case 'all':
						let sql = `select * from ${action[2]};`;
						if (action[2] === 'employees') 
							sql = `select e.id, e.first_name, e.last_name,
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
						getQuery(sql);
						break;
					case 'department':
						getDepartmentNames()
							.then(() => inquirer.prompt(chooseDepartmentQuestion))
							.then(answers => {
								let sql = `select employees.id, employees.first_name, employees.last_name, roles.title
									from departments
									inner join roles 
									on departments.id = roles.department_id
									inner join employees
									on roles.id = employees.role_id
									where departments.name = '${answers.department}';`;
								getQuery(sql);
							});
						break;
					case 'manager':
						getManagerNames()
							.then(() => inquirer.prompt(chooseManagerQuestion))
							.then(answers => {
								const [first, last] = answers.manager.split(' ');
								let sql = `select employees.id, employees.first_name, employees.last_name
									from employees
									left join employees em
									on employees.manager_id = em.id
									where em.first_name = '${first}' and em.last_name = '${last}';`;
								getQuery(sql);
							});
						break;
					case 'budget':
						getDepartmentNames()
							.then(() => inquirer.prompt(chooseDepartmentQuestion))
							.then(answers => {
								let sql = `select roles.salary
									from departments
									inner join roles 
									on departments.id = roles.department_id
									inner join employees
									on roles.id = employees.role_id
									where departments.name = '${answers.department}';`;
								db.promise().query(sql)
									.then(results => {
										const sum = results[0].reduce((prev, cur) => prev + parseInt(cur.salary), 0);
										console.log(sum);
									})
									.catch(err => console.log(err))
									.then(db.end());
							});
						break;
				}
				break;
			case 'add':
				//do something
				switch (action[1]) {
					case 'department':
						inquirer.prompt(addDepartmentQuestion)
							.then(answers => {
								let { name } = answers;
								let sql = `insert into departments (name) values ('${name}');`;
								addQuery(sql);
							})
						break;
					case 'role':
						getDepartmentNames()
							.then(() =>	inquirer.prompt(addRoleQuestions.concat(chooseDepartmentQuestion)))
							.then(answers => {
								let { title, salary, department } = answers;
								let sql = `insert into roles (title, salary, department_id)
									select '${title}', '${salary}', departments.id
									from departments
									where departments.name = '${department}';`;
								addQuery(sql);
							});
						break;
					case 'employee':
						inquirer.prompt(addEmployeeQuestions)
							.then(answers => {
								let {first, last, role, manager} = answers;
								let sql = `insert into employees (first_name, last_name, role_id, manager_id)
									values ('${first}', '${last}', '${role}', '${manager}');`;
								addQuery(sql);
							});
						break;
				}
				break;
			case 'update':
				//do something
				switch (action[2]) {
					case 'role':
						getEmployeeNames()
							.then(() => inquirer.prompt(chooseEmployeeQuestion.concat(updateRoleQuestion)))
							.then(answers => {
								const [first, last] = answers.employee.split(' ');
								let sql = `update employees
									set role_id = ${answers.role}
									where first_name = '${first}' and last_name = '${last}';`;
								addQuery(sql);
							});
						break;
					case 'manager':
						getEmployeeNames()
							.then(() => inquirer.prompt(chooseEmployeeQuestion.concat(updateManagerQuestion)))
							.then(answers => {
								const [first, last] = answers.employee.split(' ');
								let sql = `update employees
									set manager_id = ${answers.manager}
									where first_name = '${first}' and last_name = '${last}';`;
								addQuery(sql);
							});
						break;
				}
				break;
			case 'delete':
					//do something
					switch(action[1]) {
						case 'department':
							getDepartmentNames()
							.then(() => inquirer.prompt(chooseDepartmentQuestion))
							.then(answers => {
								let sql = `delete from departments where name = '${answers.name}';`;
								addQuery(sql);
							});
							break;
						case 'role':
							getRoleNames()
							.then(() => inquirer.prompt(chooseRoleQuestion))
							.then(answers => {
								let sql = `delete from roles where title = '${answers.title}';`;
								addQuery(sql);
							});
							break;
						case 'employee':
							getEmployeeNames()
							.then(() => inquirer.prompt(chooseEmployeeQuestion))
							.then(answers => {
								let sql = `delete from employees where first_name = '${answers.first}' and last_name = '${answers.last}';`;
								addQuery(sql);
							});
							break;
					}
				break;
			default:
				//do something
				db.end();
				break;
		}
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	