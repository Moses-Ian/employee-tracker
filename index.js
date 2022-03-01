const inquirer = require('inquirer');

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

promptUser();