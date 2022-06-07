import { Router } from 'express';
import UrlsController from '../controllers/UrlsController.js';
import verifyToken from '../middlewares/verifyToken.js';

const urlsRouter = Router();

urlsRouter.post('/shorten', verifyToken, UrlsController.createUrl);
urlsRouter.get('/open/:shortUrl', UrlsController.redirectUrl);
urlsRouter.get('/:id', UrlsController.getUrlById);

export default urlsRouter;
