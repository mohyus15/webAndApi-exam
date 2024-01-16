const User = require('../models/usersModel.js');
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res) => {
	const users = await User.find({});
	try {
		res.status(200).json(users);
	} catch (error) {
		res.status(404).json('you can not get the all users');
	}
};

const authUser = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	const userId = user._id.toString();
	const match = await bcrypt.compare(
		password,
		user.password
	);

	if (match) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
};

const RegisterUser = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		const userExist = await User.findOne({ email });
		if (userExist) {
			res.status(400);
			throw new Error('user allredy exist');
		}
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		const userId = req.user._id;

		const user = await User.create({
			name,
			email,
			password: hash,
		});

		if (user) {
			res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
			});
		} else {
			res.status(400);
			throw new Error('Invalid user data');
		}
	} catch (error) {}
};

// logout and clear token from http only
const loggOut = async (req, res) => {
	try {
		res.cookie('jwt', '', {
			httpOnly: true,
			expire: new Date(0),
		});
		res
			.status(200)
			.json({ message: 'logged out seccessfully' });
	} catch (error) {
		res.status(401);
		throw new Error('not looged out');
	}
};

// get user profile

const getUserProfile = async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('user not found');
	}
};

//private
const updateUserProfile = async (req, res) => {
	const user = await User.findById(req.user._id);
	try {
		if (user) {
			user.name = req.body.name || user.name;
			user.email = req.body.email || user.email;
		}
		if (req.body.password) {
			user.password = req.body.password;
		}
		const updateUserNewData = await user.save();
		res.status(200).json({
			_id: updateUserNewData._id,
			name: updateUserNewData.name,
			email: updateUserNewData.email,
			isAdmin: updateUserNewData.isAdmin,
		});
	} catch (error) {
		res.status(401);
		throw new Error('can not register that user');
	}
};

const getUseById = async (req, res) => {
	const userById = await User.findById(
		req.params.id
	).select('-password');
	if (userById) {
		res.status(200).json(userById);
	} else {
		throw new Error('User not found');
	}
};
// private/admin
const DeleteUser = async (req, res) => {
	const user = await User.findById(req.params.id);
	if (user) {
		if (user.isAdmin) {
			res.status(404);
			throw new Error('can not delete admin');
		}
		await User.deleteOne({ _id: user._id });
		res
			.status(200)
			.json({ message: 'user deleted wa successfully' });
	} else {
		res.status(404);
		throw new Error('user not found');
	}
};
// private/admin
const UpdateUser = async (req, res) => {
	const user = await User.findById(req.params.id);
	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.isAdmin = Boolean(
			req.body.isAdmin || user.isAdmin
		);
		await user.save();

		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else res.status(404);
};
module.exports = {
	authUser,
	loggOut,
	RegisterUser,
	getUseById,
	getAllUsers,
	getUserProfile,
	updateUserProfile,
	UpdateUser,
	DeleteUser,
};
