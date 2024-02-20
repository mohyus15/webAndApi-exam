const User = require('../models/usersModel');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'BESTAPP2023'; // Use environment variable for secret

const protect = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;
		if (!token) {
			throw new Error('Not authorized, no token');
		}
		const decoded = jwt.verify(token, secret);
		req.user = await User.findById(decoded._id).select('-password'); 
	} catch (error) {
		console.error(error.message);
		res.status(401).json({ error: 'Not authorized' });
	}
};

const admin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(403).json({ error: 'Not authorized as an admin' });
	}
};

module.exports = {
	protect,
	admin,
};
