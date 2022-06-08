import UsersRepository from '../repositories/UsersRepository.js';
import dotenv from 'dotenv';
dotenv.config();

export default class UsersController {
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

    static getUsersRanking = async (req, res) => {
        try {
            const users = await UsersRepository.getUsersVisitCountRanking();

            res.status(200).json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    };

    static getUserById = async (req, res) => {
        const { user } = res.locals;
        delete user.email;
        delete user.password;
        delete user.createdAt;

        res.status(200).json({ user });
    };
}
