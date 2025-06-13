import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../libs/db.libs.js';
import User from '../model/User.model.js';
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Check if email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Check if password is strong enough
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }


        // Create user
        const user = await User.create({ name, email, password: hashedPassword });


        // Save user
        await user.save().then(() => {
            console.log('User created successfully');
        })
        .catch((error) => {
            console.error('Error creating user:', error);
            return res.status(500).json({ message: 'Error creating user', error });
        });


        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION || '1h' });

        // Return success response
        res.status(201).json({ message: 'User registered successfully', user });

    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Error during registration', error });
    }
}

export const login = async (req, res) => {}

export const logout = async (req, res) => {}

export const check = async (req, res ) => {}

