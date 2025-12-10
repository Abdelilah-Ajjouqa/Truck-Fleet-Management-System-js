import HttpError from '../config/HttpError.js';

export const isAdmin = (req, res, next) => {
    try {
        if (!req.user || req.user.role !== 'ADMIN') {
            throw new HttpError('Admin access required', 403);
        }
        next();
    } catch (error) {
        next(error);
    }
};

export const isActive = (req, res, next) => {
    try {
        if (!req.user || !req.user.isActive) {
            throw new HttpError('Account is inactive or suspended', 403);
        }
        next();
    } catch (error) {
        next(error);
    }
};