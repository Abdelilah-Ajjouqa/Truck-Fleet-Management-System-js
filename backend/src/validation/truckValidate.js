import Joi from 'joi';

const truckSchema = Joi.object({
    matricule: Joi.string().required().messages({
        'string.empty': 'License plate (matricule) is required'
    }),
    model: Joi.string().required(),
    status: Joi.string().valid('AVAILABLE', 'IN_TRANSIT', 'MAINTENANCE'),
    currentMileage: Joi.number().min(0)
});

export const validateTruck = (data) => {
    const { error } = truckSchema.validate(data, { abortEarly: false });
    return error ? error.details[0].message : null;
};