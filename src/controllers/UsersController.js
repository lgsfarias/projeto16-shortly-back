import UsersRepository from '../repositories/UsersRepository.js';
import UrlRepository from '../repositories/UrlRepository.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

export default class UsersController {
    static createUser = async (req, res) => {
        const { name, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: 'Passwords do not match',
            });
        }

        const hashCost = parseInt(process.env.HASH_COST);
        const passwordHash = bcrypt.hashSync(password, hashCost);

        try {
            const emailAlreadyExists = await UsersRepository.getUserByEmail(
                email
            );

            if (emailAlreadyExists) {
                return res.status(400).json({
                    message: 'Email already exists',
                });
            }

            const user = await UsersRepository.createUser({
                name,
                password: passwordHash,
                email,
            });

            res.sendStatus(201);
        } catch (error) {
            res.status(500).json(error);
        }
    };

    static signin = async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await UsersRepository.getUserByEmail(email);

            if (!user) {
                return res.status(401).json({
                    message: 'Email or password is incorrect',
                });
            }

            const isPasswordValid = bcrypt.compareSync(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({
                    message: 'Email or password is incorrect',
                });
            }

            const token = jwt.sign(
                {
                    userId: user.id,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h',
                }
            );

            res.status(200).json({
                token,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    };

    static getUserByIdWithUrls = async (req, res) => {
        const { id } = req.params;

        try {
            const user = await UsersRepository.getUserByIdWithUrlsRelationship(
                id
            );

            if (!user) {
                return res.status(404).json({
                    message: 'User not found',
                });
            }

            if (user.visitCount === null) {
                user.visitCount = 0;
                user.shortenedUrls = [];
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    };
}
