import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';

const authRouter = Router();

authRouter.post('/signup', AuthController.signup);
authRouter.post('/signin', AuthController.signin);

export default authRouter;
