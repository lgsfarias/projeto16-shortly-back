import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import UsersRepository from '../repositories/UsersRepository.js';

const verifyToken = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            message: 'Missing token',
        });
    }

    if (authorization.slice(0, 7) !== 'Bearer ') {
        return res.status(422).json({
            message: 'Invalid token',
        });
    }

    const token = authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await UsersRepository.getUserById(decoded.userId);

        if (!user) {
            return res.status(401).json({
                message: 'Invalid token user',
            });
        }

        res.locals.user = user;

        next();
    } catch (error) {
        res.status(500).json(error);
    }
};

export default verifyToken;
