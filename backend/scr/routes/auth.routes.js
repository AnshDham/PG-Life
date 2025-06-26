import express from 'express';
import { check, login, logout, register } from '../controller/auth.controller.js';
import { authMiddleware } from '../Middleware/auth.middleware.js';

const authRoutes = express.Router();

authRoutes.post('/register', register)

authRoutes.post('/login', login)

authRoutes.get('/logout',authMiddleware, logout)

authRoutes.get('/check',authMiddleware, check)


export default authRoutes;

