require('dotenv').config();
const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./utils/db');

const app = express();
app.use(express.json());
app.use(mongoSanitize());

// Import routes
const authRoutes = require('./auth/authController');
const userRoutes = require('./users/userController');

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

module.exports = app;
