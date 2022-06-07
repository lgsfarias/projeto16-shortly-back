import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';
import schemaValidation from '../middlewares/schemaValidation.js';
import signupSchema from '../schemas/signup.schema.js';
import signinSchema from '../schemas/signin.schema.js';

const authRouter = Router();

authRouter.post(
    '/signup',
    schemaValidation(signupSchema),
    AuthController.signup
);
authRouter.post(
    '/signin',
    schemaValidation(signinSchema),
    AuthController.signin
);

export default authRouter;
