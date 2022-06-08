import { Router } from 'express';
import UsersController from '../controllers/UsersController.js';
import verifyToken from '../middlewares/verifyToken.js';

const usersRouter = Router();

usersRouter.get('/', verifyToken, UsersController.getUserById);
usersRouter.get('/ranking', UsersController.getUsersRanking);
usersRouter.get('/:id', UsersController.getUserByIdWithUrls);

export default usersRouter;
