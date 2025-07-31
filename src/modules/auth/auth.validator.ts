import Joi from 'joi';

const options = {
    errors: {
        wrap: {
            label: '',
        },
    },
};

/**
 * Validates user data against a defined schema with specified constraints.
 * @example
 * validateUserData({ email: 'test@example.com', name: 'John', password: 'Password123!' })
 * Returns valid object if input data satisfies schema constraints, otherwise returns error details.
 * @param {Object} userData - The user data object that includes id, email, name, username, and password.
 * @returns {Object} The result of the validation process containing value if valid, otherwise error details.
 * @description
 *   - Utilizes Joi library for schema definition and validation.
 *   - Ensures 'email' and 'name' fields are required; 'email' must be in a valid format.
 *   - Validates 'password' for complexity including length, uppercase, lowercase, number, and special character.
 */
export const validateSignUp = (userData: any) => {
    const schema = Joi.object({
        id: Joi.string()
            .guid({ version: 'uuidv4' })
            .optional()
            .messages({ 'string.guid': 'User ID must be in UUID format' }),
        email: Joi.string().email().required().messages({
            'string.email': 'Email format is invalid',
            'any.required': 'Email is required',
        }),
        name: Joi.string().min(1).required().messages({
            'string.min': 'Name should at least minimum 1 character',
            'any.required': 'Name is required',
        }),
        username: Joi.string().optional(),
        password: Joi.string()
            .min(8)
            .pattern(
                new RegExp(
                    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z\\d]).+$',
                ),
            )
            .required()
            .messages({
                'string.min': 'Password must have at least 8 characters.',
                'string.pattern.base':
                    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
                'any.required': 'Password is required.',
            }),
    });

    return schema.validate(userData, options);
};

export const validateSignIn = (userData: any) => {
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': 'Email format is invalid',
            'any.required': 'Email is required',
        }),
        password: Joi.string().required(),
    });

    return schema.validate(userData, options);
};
