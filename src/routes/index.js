import usersRouter from './users.routes.js';

const init = (app) => {
    app.use(usersRouter);

    app.get('/', (req, res) => {
        res.send('Shortly API');
    });
};

export default init;
