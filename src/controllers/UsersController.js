import UsersRepository from '../repositories/UsersRepository.js';
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

        const SALT = 10;
        const passwordHash = bcrypt.hashSync(password, SALT);

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
}
