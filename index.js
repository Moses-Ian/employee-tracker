const inquirer = require('inquirer');
const { validate } = require('./utils/utils');
const cTable = require('console.table');
const queries = require('./utils/queries.js');

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
	}
];

let chooseEmployeeQuestion = [{
		type: 'list',
		name: 'employee',
		message: "Which employee do you want to update?",
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

//functions
const promptUser = () => {
  return inquirer.prompt(actionQuestion);
}

const addQuery = (sql, params) => {
	db.promise().query(sql, params)
	.then(result => console.log("Query OK"))
	.catch(err => console.log("Query didn't work (you know what you did)."))
	// .catch(err => console.log(err))
	.then(db.end());
}

const getQuery = (sql, params) => {
	db.promise().query(sql, params)
		.then(results => console.table(results[0]))
		.catch(err => console.log(err))
		.then(db.end());
}

const getEmployeeNames = () => {
	sql = queries.selectEmployeeNames;
	return db.promise().query(sql)
	.then(results => {
		const names = results[0].map(r => `${r.first_name} ${r.last_name}`);
		chooseEmployeeQuestion[0].choices = names;
	});
}

const getDepartmentNames = () => {
	sql = queries.selectDepartmentNames;
	return db.promise().query(sql)
	.then(results => {
		const names = results[0];
		chooseDepartmentQuestion[0].choices = names;
	});
}

const getRoleNames = () => {
	sql = queries.selectRoleTitles;
	return db.promise().query(sql)
	.then(results => {
		const titles = results[0];
		chooseRoleQuestion[0].choices = titles.map(r => r.title);
	});
}

const getManagerNames = () => {
	sql = queries.selectManagerNames;
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
							sql = queries.selectAllEmployees;
						getQuery(sql, []);
						break;
					case 'department':
						getDepartmentNames()
							.then(() => inquirer.prompt(chooseDepartmentQuestion))
							.then(answers => {
								let sql = queries.selectAllDepartments;
								getQuery(sql, [answers.department]);
							});
						break;
					case 'manager':
						getManagerNames()
							.then(() => inquirer.prompt(chooseManagerQuestion))
							.then(answers => {
								const [first, last] = answers.manager.split(' ');
								let sql = queries.selectManager;
								getQuery(sql, [first, last]);
							});
						break;
					case 'budget':
						getDepartmentNames()
							.then(() => inquirer.prompt(chooseDepartmentQuestion))
							.then(answers => {
								let sql = queries.selectSalary;
								db.promise().query(sql, [answers.department])
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
								let sql = queries.addDepartment;
								addQuery(sql, [answers.name]);
							})
						break;
					case 'role':
						getDepartmentNames()
							.then(() =>	inquirer.prompt(addRoleQuestions.concat(chooseDepartmentQuestion)))
							.then(answers => {
								let { title, salary, department } = answers;
								let sql = queries.addRole;
								addQuery(sql, [title, salary, department]);
							});
						break;
					case 'employee':
						getRoleNames()
							.then(getManagerNames())
							.then(() => inquirer.prompt(addEmployeeQuestions.concat(chooseRoleQuestion).concat(chooseManagerQuestion)))
							.then(answers => {
								let {first, last, title, manager} = answers;
								let [managerFirst, managerLast] = manager.split(' ');
								let sql = queries.addEmployee;
								addQuery(sql, [first, last, managerFirst, managerLast, title]);
							});
						break;
				}
				break;
			case 'update':
				//do something
				switch (action[2]) {
					case 'role':
						getEmployeeNames()
							.then(getRoleNames())
							.then(() => inquirer.prompt(chooseEmployeeQuestion.concat(chooseRoleQuestion)))
							.then(answers => {
								const [first, last] = answers.employee.split(' ');
								let sql = queries.updateEmployeeRole;
								addQuery(sql, [answers.title, first, last]);
							});
						break;
					case 'manager':
						getEmployeeNames()
							.then(getManagerNames())
							.then(() => inquirer.prompt(chooseEmployeeQuestion.concat(chooseManagerQuestion)))
							.then(answers => {
								const [first, last] = answers.employee.split(' ');
								const [managerFirst, managerLast] = answers.manager.split(' ');
								let sql = queries.updateEmployeeManager;
								addQuery(sql, [managerFirst, managerLast, first, last]);
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
								let sql = queries.deleteDepartment;
								addQuery(sql, [answers.name]);
							});
							break;
						case 'role':
							getRoleNames()
							.then(() => inquirer.prompt(chooseRoleQuestion))
							.then(answers => {
								let sql = queries.deleteRole;
								addQuery(sql, [answers.title]);
							});
							break;
						case 'employee':
							getEmployeeNames()
							.then(() => inquirer.prompt(chooseEmployeeQuestion))
							.then(answers => {
								const [first, last] = answers;
								let sql = queries.deleteEmployee;
								addQuery(sql, [first, last]);
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
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	