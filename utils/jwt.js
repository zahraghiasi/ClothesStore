const jwt = require('jsonwebtoken');

const secretKey = 'your_secret_key';

const generateToken = (payload) => {
    return jwt.sign(payload, secretKey);
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
};

module.exports = {
    generateToken,
    verifyToken
};