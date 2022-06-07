import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';
import schemaValidation from '../middlewares/schemaValidation.js';
import signupSchema from '../schemas/signup.schema.js';

const authRouter = Router();

authRouter.post(
    '/signup',
    schemaValidation(signupSchema),
    AuthController.signup
);
authRouter.post('/signin', AuthController.signin);

export default authRouter;
