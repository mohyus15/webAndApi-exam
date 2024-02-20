const User = require("../models/usersModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = "secret";

const createToken = (_id) => {
    return jwt.sign({ _id }, secret, { expiresIn: '90d' });
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json('Invalid email or password' );
    }
};

const authUser = async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await User.findOne({ name });

        if (!user) {
            res.status(401).json('Invalid name or password' );
            return;
        }

        const match = await bcrypt.compare(password, user.password);

        if (match) {
            const token = createToken(user._id);
            console.log('token', token);
            res.json({
                _id: user._id,
                name: user.name,
                isAdmin: user.isAdmin,
                token
            });
        } else {
            res.status(401).json('Invalid name or password' );
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error' );
    }
};

const RegisterUser = async (req, res) => {
    const { name,  password } = req.body;

    if (!name) {
        return res.status(400).json('name is required' );
    }

    try {
        const userExist = await User.findOne({ name });

        if (userExist) {
            return res.status(400).json('User already exists' );
        }


        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

 
        const user = await User.create({
            name,
            password: hash,
        });

   
        const token = createToken(user._id);

       
        res.status(201).json({
            _id: user._id,
            name: user.name,
            isAdmin: user.isAdmin,
            token: token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json( 'Internal Server Error' );
    }
};


const loggOut = async (req, res) => {
    try {
        res.cookie('jwt', '', {
            httpOnly: true,
            expire: new Date(0),
        });
        res.status(200).json( 'Logged out successfully' );
    } catch (error) {
        console.error(error);
        res.status(401).json('Not logged out' );
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                isAdmin: user.isAdmin,
            });
        } else {
            res.status(404).json( 'User not found' );
        }
    } catch (error) {
        console.error(error);
        res.status(500).json( 'Internal Server Error' );
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            user.name = req.body.name || user.name;
    
        }
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updateUserNewData = await user.save();
        res.status(200).json({
            _id: updateUserNewData._id,
            name: updateUserNewData.name,
            isAdmin: updateUserNewData.isAdmin,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json( 'Internal Server Error' );
    }
};

const getUseById = async (req, res) => {
    try {
        const userById = await User.findById(req.params.id).select('-password');
        if (userById) {
            res.status(200).json(userById);
        } else {
            res.status(404).json( 'User not found' );
        }
    } catch (error) {
        console.error(error);
        res.status(500).json( 'Internal Server Error' );
    }
};

const DeleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            if (user.isAdmin) {
                res.status(404).json( 'Cannot delete admin' );
            } else {
                await User.deleteOne({ _id: user._id });
                res.status(200).json( 'User deleted successfully' );
            }
        } else {
            res.status(404).json( 'User not found' );
        }
    } catch (error) {
        console.error(error);
        res.status(500).json( 'Internal Server Error' );
    }
};

const UpdateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.name = req.body.name || user.name;
            user.isAdmin = Boolean(req.body.isAdmin || user.isAdmin);
            await user.save();
            res.status(200).json({
                _id: user._id,
                name: user.name,
                isAdmin: user.isAdmin,
            });
        } else {
            res.status(404).json('User not found' );
        }
    } catch (error) {
        console.error(error);
        res.status(500).json( 'Internal Server Error' );
    }
};

module.exports = {
    getAllUsers,
    authUser,
    RegisterUser,
    loggOut,
    getUserProfile,
    updateUserProfile,
    getUseById,
    DeleteUser,
    UpdateUser,
};
