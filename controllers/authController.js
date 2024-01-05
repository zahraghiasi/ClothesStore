const User = require('../models/User');
const jwt = require('../utils/jwt');
const logger = require('../utils/logger');

const signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const newUser = await User.create({ username, password });
        const token = jwt.generateToken({ userId: newUser._id });

        logger.info(`Received a ${req.method} request for ${req.url}`);
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!(user.password === password)) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.generateToken({ userId: user._id });

        logger.info(`Received a ${req.method} request for ${req.url}`);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = {
    signup,
    login
};