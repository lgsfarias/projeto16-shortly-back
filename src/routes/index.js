import usersRouter from './users.routes.js';
import urlsRouter from './urls.routes.js';
import authRouter from './auth.routes.js';

const init = (app) => {
    app.use('/users', usersRouter);
    app.use('/urls', urlsRouter);
    app.use(authRouter);

    app.get('/', (req, res) => {
        res.send('Shortly API');
    });
};

export default init;
