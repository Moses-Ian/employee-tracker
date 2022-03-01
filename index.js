const inquirer = require('inquirer');
const { validate } = require('./utils/utils');
const cTable = require('console.table');

//connect to mysql database
const db = require('./db/connection');

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
  return inquirer.prompt([{
		type: 'input',
		name: 'action',
		message: 'What would you like to do?'
	}]);
}

promptUser()	// returns a promise
	.then(answers => {
		let { action } = answers;
		action = action.trim().toLowerCase().split(' ');
		if (!validate(action))
			return;
		switch(action[0]) {
			case 'view':
				//do something
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
				return db.promise().query(sql);
				break;
			case 'add':
				//do something
				break;
			case 'update':
				//do something
				break;
			default:
				//do something
				break;
		}
	})
	.then(results => console.table(results[0]))	//rows = results[0]
	.then(() => db.end());