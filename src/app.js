import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

import init from './routes/index.js';

const app = express();
app.use(json());
app.use(cors());

if (process.env.NODE_ENV === 'dev') {
    app.use(morgan('dev'));
}

init(app);

export default app;
