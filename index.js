const inquirer = require('inquirer');

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
		console.log(action);
		if (!validate(action))
			return;
		switch(action[0]) {
			case 'view':
				//do something
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
	.then(db.end());