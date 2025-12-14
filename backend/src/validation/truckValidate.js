import Joi from 'joi';

const truckSchema = Joi.object({
    matricule: Joi.string().required().messages({
        'string.empty': 'License plate (matricule) is required'
    }),
    model: Joi.string().required(),
    status: Joi.string().valid('AVAILABLE', 'IN_TRANSIT', 'MAINTENANCE', 'RESERVED'),
    currentMileage: Joi.number().min(0),
    fuelLevel: Joi.number().min(0).max(100),
    tireCondition: Joi.string().valid('GOOD', 'WORN', 'CRITICAL'),
    lastMaintenanceDate: Joi.date().allow(null, ''),
    lastMaintenanceMileage: Joi.number().min(0)
});

export const validateTruck = (data) => {
    const { error } = truckSchema.validate(data, { abortEarly: false });
    return error ? error.details[0].message : null;
};