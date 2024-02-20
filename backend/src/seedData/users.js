const bcrypt = require('bcryptjs');
const users = [
	{
		name: 'admin',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
	},
	{
		name: 'sensur',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
	},
	{
		name: 'Mohamad',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: false,
	},
	{
		name: 'Ola',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: false,
	},
];

module.exports = users;
