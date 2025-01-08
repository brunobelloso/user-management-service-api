const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('./userModel');
const bcrypt = require('bcryptjs');
const authenticateJWT = require('../auth/authMiddleware');
const router = express.Router();

router.post(
    '/register',
    [
        body('username').isString().trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
        body('password')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters')
            .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/)
            .withMessage('Password must contain a letter, a number, and a special character'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { username, password } = req.body;
        try {
            const existingUser = await User.findOne({ username });
            if (existingUser) return res.status(400).send('Username already exists');

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ username, password: hashedPassword });
            await newUser.save();

            res.status(201).send('User registered successfully');
        } catch (err) {
            console.error('Error during registration:', err.message);
            res.status(500).send('Server error');
        }
    }
);

router.get('/profile', authenticateJWT, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).send('User not found');
        res.json(user);
    } catch (err) {
        console.error('Error fetching profile:', err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
