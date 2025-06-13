import express from 'express';

const authRoutes = express.Router();

authRoutes.post('/register', register)

authRoutes.post('/login', login)

authRoutes.get('/logout', logout)

authRoutes.get('/check', check)


export default authRoutes;

