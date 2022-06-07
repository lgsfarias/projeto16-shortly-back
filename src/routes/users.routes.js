import { Router } from 'express';
import UsersController from '../controllers/UsersController.js';

const usersRouter = Router();

usersRouter.post('/signup', UsersController.createUser);
usersRouter.post('/signin', UsersController.signin);

export default usersRouter;
