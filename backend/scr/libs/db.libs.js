import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const db = async () => {
    try {
        const dbUrl = process.env.MONGO_URL
        if (!dbUrl){
            throw new Error('Database URL is not defined in environment variables');
        }
        await mongoose.connect(dbUrl)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
            throw error; // Re-throw the error to be handled by the caller
        })

        
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
}

export default db;
// This function connects to the MongoDB database using Mongoose.