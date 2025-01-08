const mongoose = require('mongoose');

const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err.message);
        process.exit(1);
    }
};


module.exports = connectDB;
