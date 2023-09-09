import sortBy from 'sort-by';

interface IUser {
	id: number;
	name: string;
	age: string;
	email: {
		primary: string;
	}
}

const users = [{
	id: 7,
	name: 'Foo',
	age: '34',
	email: { primary: 'foo@email.com' }
}, {
	id: 3,
	name: 'Baz',
	age: '67',
	email: { primary: 'baz@email.com' }
}, {
	id: 4,
	name: 'Bar',
	age: '67',
	email: { primary: 'bar@email.com' }
}];

console.log(users.sort(sortBy<IUser>('name', 'age')));