import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/User.model.js';


export const register = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, collegeName } = req.body;
        if (!name || !email || !password || !phoneNumber || !collegeName) {
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
        // Check if phone number is valid
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        if (!phoneRegex.test(phoneNumber)) {
            return res.status(400).json({ message: 'Invalid phone number format' });
        }


        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }


        // Create user
        const user = await User.create({ name, email, password: hashedPassword, phoneNumber, collegeName });


        // Save user
        await user.save().then(() => {
            console.log('User created successfully');
        })
        .catch((error) => {
            console.error('Error creating user:', error);
            return res.status(500).json({ message: 'Error creating user', error });
        });


        // Generate JWT
        const token = jwt.sign({ id: user._id, email: user.email, role: user.role, name: user.name, phoneNumber: user.phoneNumber, collegeName: user.collegeName }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION || '1h' });

        // Set token in cookie
        res.cookie('token', token, {
            httpOnly: true,      // Prevents JS access to the cookie (XSS protection)
            secure: false,       // Set to true if using HTTPS
            sameSite: "lax",     // CSRF protection
            maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
        })

        // Return success response
        res.status(201).json({
             message: 'User registered successfully', 
             user: { 
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phoneNumber: user.phoneNumber,
                collegeName: user.collegeName
             } 
            });

    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Error during registration', error });
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body


        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }


        // Check if email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Check if user exists

        const user = await User.findOne({email})
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id, email: user.email, role: user.role, name: user.name, phoneNumber: user.phoneNumber, collegeName: user.collegeName}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION || '1h' });
        // Set token in cookie
        res.cookie('token', token, {
            httpOnly:true, 
            secure:false,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
            path: '/' // Ensure the cookie is accessible across the application
        })

        // Return success response

        res.status(200).json({
            message: 'Login successful',
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phoneNumber: user.phoneNumber,
                collegeName: user.collegeName,
            }
        });


    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error during login', error });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', token, {
            httpOnly:true, 
            secure:false,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ message: 'Error during logout', error });    
    }
}

export const check = async (req, res ) => {
    try {
        // Check if user is authenticated
        if (!req.user) {
            return res.status(401).json({ message: 'User is not authenticated' });
        }
        console.log('User is authenticated:', req.user);
        // If user is authenticated, return user details
        res.status(200).json({
            message: 'User is authenticated',
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                role: req.user.role,
                phoneNumber: req.user.phoneNumber,
                collegeName: req.user.collegeName,
            }
        });
    } catch (error) {
        console.error('Error during user check:', error);
        res.status(500).json({ message: 'Error during user check', error });    
    }
}

