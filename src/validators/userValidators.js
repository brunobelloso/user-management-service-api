const { body } = require('express-validator');

const registerValidation = [
    body('username').isString().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    body('password').isLength({ min: 8 }).matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/)
        .withMessage('Password must include letters, numbers, and special characters'),
];

module.exports = { registerValidation };
