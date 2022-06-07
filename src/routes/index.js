const init = (app) => {
    app.get('/', (req, res) => {
        res.send('Shortly API');
    });
};

export default init;
