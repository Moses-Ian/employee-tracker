// validate action
const validate = action => {
	if (!action[0])
		return false;
	switch (action[0]) {
		case 'view':
			if (!action[1] || action[1] != 'all')
				return false;
			if (!action[2])
				return false;
			return action[2] === 'departments' || action[2] === 'roles' || action[2] === 'employees';

		case 'add':
			if (!action[1])
				return false;
			return action[1] === 'department' || action[1] === 'role' || action[1] === 'employee';

		case 'update':
			if (!action[1] || action[1] != 'employee')
				return false;
			if (!action[2])
				return false;
			if (action[2] === 'role' || action[2] === 'manager')
				return true;
			return false;
		default:
			return false;
	}
	
	
}

module.exports = { validate };