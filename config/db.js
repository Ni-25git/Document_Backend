const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const mongoUrl = process.env.MONGO_URL;
        
        if (!mongoUrl) {
            throw new Error('MONGO_URL environment variable is not defined');
        }

        await mongoose.connect(mongoUrl, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
            maxPoolSize: 10, // Maintain up to 10 socket connections
            minPoolSize: 2, // Maintain at least 2 socket connections
        });
        
        console.log('Database connected successfully');
        
        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });
        
        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB reconnected');
        });
        
    } catch (error) {
        console.error('Error connecting to database:', error.message);
        throw error; // Re-throw to handle in the main app
    }
};

module.exports = connectDb;