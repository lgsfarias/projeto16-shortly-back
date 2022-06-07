import { Router } from 'express';
import UrlsController from '../controllers/UrlsController.js';
import verifyToken from '../middlewares/verifyToken.js';
import schemavalidation from '../middlewares/schemaValidation.js';
import urlSchema from '../schemas/url.schema.js';

const urlsRouter = Router();

urlsRouter.post(
    '/shorten',
    verifyToken,
    schemavalidation(urlSchema),
    UrlsController.createUrl
);
urlsRouter.get('/open/:shortUrl', UrlsController.redirectUrl);
urlsRouter.get('/:id', UrlsController.getUrlById);
urlsRouter.delete('/:id', verifyToken, UrlsController.deleteUrl);

export default urlsRouter;
