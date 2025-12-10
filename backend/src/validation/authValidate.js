import Joi from 'joi';

const registerSchema = Joi.object({
    firstName: Joi.string().required().messages({
        'string.empty': 'First name is required',
    }),
    lastName: Joi.string().required().messages({
        'string.empty': 'Last name is required',
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email address',
        'string.empty': 'Email is required'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'string.empty': 'Password is required'
    })
});

const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email address',
        'string.empty': 'Email is required'
    }),
    password: Joi.string().required().messages({
        'string.empty': 'Password is required'
    })
});

const validate = (schema, data) => {
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
        return error.details[0].message;
    }

    return null;
};

export const validateRegister = (data) => {
    return validate(registerSchema, data);
};

export const validateLogin = (data) => {
    return validate(loginSchema, data);
};