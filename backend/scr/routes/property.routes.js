import express from 'express';
import { deletePropertyById, getProperties, getPropertyById, registerProperty, updatePropertyById } from '../controller/property.controller.js';
import { authMiddleware } from '../Middleware/auth.middleware.js';

const propertyRoutes = express.Router();

propertyRoutes.post('/register-property',authMiddleware,registerProperty)

propertyRoutes.get('/get-properties', authMiddleware, getProperties);

propertyRoutes.get('/get-property/:id', authMiddleware, getPropertyById);

propertyRoutes.put('/update-property/:id', authMiddleware, updatePropertyById);

propertyRoutes.delete('/delete-property/:id', authMiddleware, deletePropertyById);






export default propertyRoutes;