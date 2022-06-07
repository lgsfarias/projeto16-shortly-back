import joi from 'joi';

const ulrSchema = joi.object().keys({
    url: joi.string().uri().required(),
});

export default ulrSchema;
