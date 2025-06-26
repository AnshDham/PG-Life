import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './libs/db.libs.js';
import cookieParser from 'cookie-parser';


// Routes

import authRoutes from './routes/auth.routes.js';
import propertyRoutes from './routes/Property.routes.js';

// Load environment variables from .env file

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// app.use(cors(
//   {
//     origin: 'http://127.0.0.1:3000', // Allowed origin(s)
//     methods: process.env.CORS_METHODS || 'GET, POST, PUT, DELETE', // Allowed HTTP methods
//     credentials:  true, // Allow credentials (cookies, authorization headers, etc.)
//   }
// ));
app.use(cors({
  origin: (origin, callback) => callback(null, true),
  credentials: true,
}))
// app.use(cors())
app.use(express.json());
app.use(cookieParser()); // Middleware to parse cookies




app.get('/', (req, res) => {
  res.send('Welcome to PG LIFE');
})

// database connection
 db()
 .then(() => {
  console.log('Database connected successfully');
 })
 .catch((error) => {
  console.error('Database connection failed:', error);
 })



// Use routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/property', propertyRoutes);



// Handle 404 errors for undefined routes
app.use((req, res ) => {
    res.status(404).json({
        message: 'Route Not Found',
        status: 404
    });
})


// Start the server
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})

