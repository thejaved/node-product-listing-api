const jwt = require('jsonwebtoken');
const { secret } = require('../config/auth');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.header('token');

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Invalid token.' });
    }
};

module.exports = {
    verifyToken,
};