import jwt from 'jsonwebtoken';
import HttpError from '../config/HttpError.js';
import User from '../models/User.js';

export const authMiddleware = async (req, res, next) => {
    let token;

    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            throw new HttpError('Not authorized to access this route', 401);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            throw new HttpError('The user with this token no longer exists.', 401);
        }
        req.user = currentUser;

        next();

    } catch (error) {
        next(error);
    }
};