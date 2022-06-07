const schemavalidation = (schema) => {
    return (req, res, next) => {
        const { value, error } = schema.validate(req.body, {
            abortEarly: false,
        });

        if (error) {
            return res.status(422).json({
                message: 'Validation failed',
                error: error.details.map((err) => err.message),
            });
        }

        res.locals.category = value;

        next();
    };
};

export default schemavalidation;
