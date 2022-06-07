import joi from 'joi';

const signupSchema = joi.object().keys({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required(),
});

export default signupSchema;
