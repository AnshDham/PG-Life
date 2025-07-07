import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './scr/libs/db.libs.js';
import cookieParser from 'cookie-parser';


// Routes

import authRoutes from './scr/routes/auth.routes.js';
import propertyRoutes from './scr/routes/property.routes.js';

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

// _________________________________________________
// const allowedOrigins = [
//   'http://localhost:3000',
//   'http://127.0.0.1:56197',
//   'http://localhost:3001',
//   'http://localhost:3000/api/v1/auth/check',
//   'http://localhost:56197',
//   'http://localhost:56197/frontend/profile/profile.html', // Add more as needed
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like mobile apps, curl)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     } else {
//       return callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
// }));

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

