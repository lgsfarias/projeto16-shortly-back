import jwt from 'jsonwebtoken';
import UsersRepository from '../repositories/UsersRepository.js';

const verifyToken = async (req, res, next) => {
    const { authorization } = req.headers;

    if (authorization.slice(0, 7) !== 'Bearer ') {
        return res.status(422).json({
            message: 'Invalid token',
        });
    }

    if (!authorization) {
        return res.status(401).json({
            message: 'Missing token',
        });
    }

    const token = authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const user = await UsersRepository.getUserById(decoded.id);

        if (!user) {
            return res.status(401).json({
                message: 'Invalid token',
            });
        }

        res.locals.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid token',
        });
    }
};

export default verifyToken;
