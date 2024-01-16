const {
	authUser,
	loggOut,
	RegisterUser,
	getUseById,
	getAllUsers,
	getUserProfile,
	updateUserProfile,
	UpdateUser,
	DeleteUser,
} = require('../controllers/usersControllers.js');
const {
	admin,
	protect,
} = require('../midddelwars/permission.js');
const express = require('express');
const userRouters = express.Router();

userRouters.get('/', getAllUsers);
userRouters.post('/', RegisterUser);
userRouters.post('/logout', loggOut);
userRouters.post('/auth', authUser);
userRouters.get('/profile', getUserProfile);
userRouters.put('/profile', updateUserProfile);
userRouters.delete('/:id', DeleteUser);
userRouters.get('/:id', getUseById);
userRouters.put('/:id', UpdateUser);
module.exports = userRouters;
