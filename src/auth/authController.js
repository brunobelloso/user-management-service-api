const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../users/userModel');
const router = express.Router();

router.post(
    '/login',
    [
        body('username').notEmpty().withMessage('Username is required'),
        body('password').notEmpty().withMessage('Password is required')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;
        try {
            const user = await User.findOne({ username });
            if (!user) return res.status(400).send('Invalid username or password');

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).send('Invalid username or password');

            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ message: 'Login successful', token });
        } catch (err) {
            console.error('Error during login:', err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;
