import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const authMiddleware = (req, res, next) => {
    try {
        console.log('Authentication middleware triggered', req.cookies);
        
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Verify the token and extract user information
        const user = jwt.verify(token, process.env.JWT_SECRET);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        console.log('Authenticated user:', user);
        // Attach user information to the request object
        req.user = user;
        next();
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).json({ message: 'Error during authentication', error });
    }
}