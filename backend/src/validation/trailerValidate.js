import Joi from 'joi';

const trailerSchema = Joi.object({
    matricule: Joi.string().required().messages({
        'string.empty': 'Matricule is required'
    }),
    type: Joi.string().valid('FRIGO', 'BACHE', 'PLATEAU', 'CITERNE').required(),
    status: Joi.string().valid('AVAILABLE', 'IN_TRANSIT', 'MAINTENANCE', 'RESERVED'),
    tireCondition: Joi.string().valid('GOOD', 'WORN', 'CRITICAL')
});

export const validateTrailer = (data) => {
    const { error } = trailerSchema.validate(data, { abortEarly: false });
    return error ? error.details[0].message : null;
};