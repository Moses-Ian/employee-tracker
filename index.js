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
	}, {
		type: 'number',
		name: 'department',
		message: 'What is the ID of the department this role belongs to?',
		validate: input => {
			if (isNaN(input)) 
				return 'Department ID must be a number!';
			return true;
		}
	}
];
	

//returns a promise
console.log(`You can:
view all departments
view all roles
view all employees
add department
add role
add employee
update employee role`);

const promptUser = () => {
  return inquirer.prompt(actionQuestion);
}

const addQuery = (sql) => {
	db.promise().query(sql)
	.then((result, err) => {
		if (!err)
			console.log("Query OK")
	})
	.then(db.end());
}

promptUser()	// returns a promise
	.then(answers => {
		let { action } = answers;
		action = action.trim().toLowerCase().split(' ');
		if (!validate(action))
			return;
		switch(action[0]) {
			case 'view':
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
				db.promise().query(sql)
				.then(results => console.table(results[0]))	//rows = results[0]
				.then(() => db.end());
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
						inquirer.prompt(addRoleQuestions)
							.then(answers => {
								let { title, salary, department } = answers;
								let sql = `insert into roles (title, salary, department_id)
									values ('${title}', '${salary}', '${department}')`;
								addQuery(sql);
							});
						break;
				}
				break;
			case 'update':
				//do something
				break;
			default:
				//do something
				break;
		}
	})
