import Joi from '@hapi/joi';

export function registerValidation(data) {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required(),
    
        name: Joi.string()
            .min(3)
            .required(),
        
        password: Joi.string()
            .min(8)
            .required()
    })

    return schema.validate(data)
}

export function loginValidation(data) {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required(),
        
        password: Joi.string()
            .min(8)
            .required(),
    })

    return schema.validate(data)
}

export function createNote(data) {
    const schema = Joi.object({
        title: Joi.string().empty('').default(''),
        content: Joi.string().empty('').default('')
    })

    return schema.validate(data)
}

export function updateNote (data) {
    const schema = Joi.object({
        id: Joi.string().min(1).required(),
        title: Joi.string().empty('').default(''),
        content: Joi.string().empty('').default('')
    })

    return schema.validate(data)
}
