const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { secret, tokenExpiry } = require('../config/auth');
const User = require('../models/User');
const sendEmail = require('../middlewares/sendEmail');

// Register a new user with email verification through OTP
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the email is already in use
        const existingEmailUser = await User.findOne({ email });
        if (existingEmailUser) {
            return res.status(409).json({ error: 'Email is already in use.' });
        }

        // Check if the username is already taken
        const existingUsernameUser = await User.findOne({ username });
        if (existingUsernameUser) {
            return res.status(409).json({ error: 'Username is already taken.' });
        }

        const user = new User({ username, email, password });

        // Hash the user's password
        user.password = await bcrypt.hash(password, 10);

        // Generate and send OTP via email
        const otp = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP
        const otpSent = await sendEmail(email, 'Your OTP for registration', otp);

        if (otpSent) {
            user.otp = otp;
            const savedUser = await user.save();
            res.json({ message: 'User registered successfully', user: savedUser });
        } else {
            res.status(500).json({ error: 'Could not send OTP email' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Could not register the user' });
    }
};

// Verify user's email using OTP
const verifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.otp === otp) {
            user.isEmailVerified = true;
            await user.save();
            res.json({ message: 'Email verified successfully' });
        } else {
            res.status(400).json({ error: 'Invalid OTP' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Could not verify email' });
    }
};

// User login and token issuance
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            const token = jwt.sign({ userId: user._id, email: user.email }, secret, { expiresIn: tokenExpiry });
            res.json({ message: 'Login successful', token });
        } else {
            res.status(401).json({ error: 'Incorrect password' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Could not login' });
    }
};

module.exports = {
    register,
    verifyEmail,
    login,
};
