import { Router } from 'express';
import UsersController from '../controllers/UsersController.js';

const usersRouter = Router();

usersRouter.get('/ranking', UsersController.getUsersRanking);
usersRouter.get('/:id', UsersController.getUserByIdWithUrls);

export default usersRouter;
