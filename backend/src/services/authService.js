import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { validateRegister, validateLogin } from '../validation/authValidate.js';
import HttpError from '../config/HttpError.js';

class AuthService {
    static #generateToken(user) {
        const payload = {
            id: user._id,
            role: user.role,
            email: user.email,
        };

        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || '1d',
        });
    }

    static async register(userData) {
        const validationError = validateRegister(userData);
        if (validationError) {
            throw new HttpError(validationError);
        }

        const { firstName, lastName, email, password, confirmPassword } = userData;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new HttpError('User already exists', 409);
        }

        if(password !== confirmPassword){
            throw new HttpError('password or confirm password don\'t match', 401);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: 'DRIVER'
        });

        const token = this.#generateToken(newUser);

        return {
            user: {
                id: newUser._id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                role: newUser.role
            },
            token
        };
    }

    static async login(email, password) {
        const validationError = validateLogin({ email, password });
        if (validationError) {
            throw new HttpError(validationError);
        }

        const user = await User.findOne({ email });
        if (!user) {
            throw new HttpError('Invalid credentials', 404);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new HttpError('Invalid credentials', 401)
        }

        const token = this.#generateToken(user);

        return {
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            },
            token
        };
    }
}

export default AuthService;