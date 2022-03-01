const { validate } = require('../utils/utils.js');

describe('validate', () => {
	describe('view', () => {
		test('view all departments', () => {
			const str = 'view all departments'.trim().toLowerCase().split(' ');
			expect(validate(str)).toBe(true);
		});
		
		test('view all roles', () => {
			const str = 'view all roles'.trim().toLowerCase().split(' ');
			expect(validate(str)).toBe(true);
		});
		
		test('view all employees', () => {
			const str = 'view all employees'.trim().toLowerCase().split(' ');
			expect(validate(str)).toBe(true);
		});
		
		test('view department', () => {
			const str = 'view department'.trim().toLowerCase().split(' ');
			expect(validate(str)).toBe(true);
		});
		
		test('view manager', () => {
			const str = 'view manager'.trim().toLowerCase().split(' ');
			expect(validate(str)).toBe(true);
		});
		
		test('view budget', () => {
			const str = 'view budget'.trim().toLowerCase().split(' ');
			expect(validate(str)).toBe(true);
		});
		
		test('view departments', () => {
			const str = 'view departments'.trim().toLowerCase().split(' ');
			expect(validate(str)).toBe(false);
		});
		
		test('view all', () => {
			const str = 'view all'.trim().toLowerCase().split(' ');
			expect(validate(str)).toBe(false);
		});
		
		test('view', () => {
			const str = 'view'.trim().toLowerCase().split(' ');
			expect(validate(str)).toBe(false);
		});
		
		test('vew all', () => {
			const str = 'vew all'.trim().toLowerCase().split(' ');
			expect(validate(str)).toBe(false);
		});
		
		test('', () => {
			const str = ''.trim().toLowerCase().split(' ');
			expect(validate(str)).toBe(false);
		});
	});
	
	describe('add', () => {
		test('add department', () => {
			const str = 'add department'.trim().toLowerCase().split(' ');
			expect(validate(str)).toBe(true);
		});

		test('add role', () => {
			const str = 'add role'.trim().toLowerCase().split(' ');
			expect(validate(str)).toBe(true);
		});

		test('add employee', () => {
			const str = 'add employee'.trim().toLowerCase().split(' ');
			expect(validate(str)).toBe(true);
		});

		test('add fart', () => {
			const str = 'add fart'.trim().toLowerCase().split(' ');
			expect(validate(str)).toBe(false);
		});

		test('add', () => {
			const str = 'add'.trim().toLowerCase().split(' ');
			expect(validate(str)).toBe(false);
		});

		test('app department', () => {
			const str = 'app department'.trim().toLowerCase().split(' ');
			expect(validate(str)).toBe(false);
		});

		test('', () => {
			const str = ''.trim().toLowerCase().split(' ');
			expect(validate(str)).toBe(false);
		});
	});
	
	describe('update', () => {
		test('update employee role', () => {
			const str = 'update employee role'.trim().toLowerCase().split(' ');
			expect(validate(str)).toBe(true);
		});
		
		test('update employee manager', () => {
			const str = 'update employee manager'.trim().toLowerCase().split(' ');
			expect(validate(str)).toBe(true);
		});
		
		test('update employee rope', () => {
			const str = 'update employee rope'.trim().toLowerCase().split(' ');
			expect(validate(str)).toBe(false);
		});
		
		test('update emploee role', () => {
			const str = 'update emploee role'.trim().toLowerCase().split(' ');
			expect(validate(str)).toBe(false);
		});
		
		test('udate employee role', () => {
			const str = 'udate employee role'.trim().toLowerCase().split(' ');
			expect(validate(str)).toBe(false);
		});
		
	});
});