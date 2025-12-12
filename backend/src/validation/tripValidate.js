import Joi from 'joi';

// For Admin creating a trip
const createTripSchema = Joi.object({
    truckId: Joi.string().required(),
    driverId: Joi.string().required(),
    departure: Joi.string().required(),
    destination: Joi.string().required(),
    startDate: Joi.date().min('now').required().messages({
        'date.min': 'Start date cannot be in the past'
    }),
    startMileage: Joi.number().min(0).required()
});

// For Driver updating status
const updateStatusSchema = Joi.object({
    status: Joi.string().valid('IN_PROGRESS', 'COMPLETED').required(),
    currentMileage: Joi.number().min(0),
    fuelLevel: Joi.number().min(0).max(100),
    remarks: Joi.string().allow('')
});

export const validateCreateTrip = (data) => {
    const { error } = createTripSchema.validate(data, { abortEarly: false });
    return error ? error.details[0].message : null;
};

export const validateTripStatus = (data) => {
    const { error } = updateStatusSchema.validate(data, { abortEarly: false });
    return error ? error.details[0].message : null;
};