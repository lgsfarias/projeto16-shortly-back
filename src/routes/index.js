import usersRouter from './users.routes.js';
import urlsRouter from './urls.routes.js';

const init = (app) => {
    app.use(usersRouter);
    app.use('/urls', urlsRouter);

    app.get('/', (req, res) => {
        res.send('Shortly API');
    });
};

export default init;
