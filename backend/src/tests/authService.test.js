import AuthService from '../services/authService.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validateRegister, validateLogin } from '../validation/authValidate.js';

jest.mock('../models/User.js');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../validation/authValidate.js');

describe('AuthService Unit Tests', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('register()', () => {
        const mockUserData = {
            firstName: 'Abdelilah',
            lastName: 'Ajjouqa',
            email: 'test@example.com',
            password: 'password123',
            confirmPassword: 'password123'
        };

        it('should register a new user successfully', async () => {
            validateRegister.mockReturnValue(null); // Validation passes
            User.findOne.mockResolvedValue(null);   // No existing user
            bcrypt.hash.mockResolvedValue('hashed_password'); // Hash success

            const mockCreatedUser = {
                _id: 'user_id_123',
                firstName: 'Abdelilah',
                lastName: 'Ajjouqa',
                email: 'test@example.com',
                role: 'DRIVER',
                save: jest.fn()
            };
            User.create.mockResolvedValue(mockCreatedUser);
            jwt.sign.mockReturnValue('mock_token');

            const result = await AuthService.register(mockUserData);

            expect(User.findOne).toHaveBeenCalledWith({ email: mockUserData.email });
            expect(bcrypt.hash).toHaveBeenCalledWith(mockUserData.password, 10);
            expect(User.create).toHaveBeenCalled();
            expect(result).toHaveProperty('token', 'mock_token');
            expect(result.user).toHaveProperty('email', 'test@example.com');
        });

        it('should throw error if user already exists', async () => {
            validateRegister.mockReturnValue(null);
            User.findOne.mockResolvedValue({ email: 'test@example.com' }); // User exists

            await expect(AuthService.register(mockUserData))
                .rejects
                .toThrow('User already exists');
        });
    });

    describe('login()', () => {
        const mockLoginData = {
            email: 'test@example.com',
            password: 'password123'
        };

        it('should login successfully with valid credentials', async () => {
            validateLogin.mockReturnValue(null);

            const mockUser = {
                _id: 'user_id_123',
                email: 'test@example.com',
                password: 'hashed_password', // stored in DB
                firstName: 'Abdelilah',
                lastName: 'Ajjouqa',
                role: 'DRIVER'
            };

            User.findOne.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(true); // Password matches
            jwt.sign.mockReturnValue('mock_token');

            const result = await AuthService.login(mockLoginData.email, mockLoginData.password);

            expect(User.findOne).toHaveBeenCalledWith({ email: mockLoginData.email });
            expect(bcrypt.compare).toHaveBeenCalledWith(mockLoginData.password, mockUser.password);
            expect(result).toHaveProperty('token', 'mock_token');
        });

        it('should throw error if password is invalid', async () => {
            validateLogin.mockReturnValue(null);
            const mockUser = {
                email: 'test@example.com',
                password: 'hashed_password'
            };

            User.findOne.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(false);

            await expect(AuthService.login(mockLoginData.email, mockLoginData.password))
                .rejects
                .toThrow('Invalid credentials');
        });
    });
});