const guest = require('./guest-routes');
const user = require('./user-routes');

module.exports = function (app) {

    app.use('/user', user);
    app.use('/', guest);
    app.all('*', function (req, res) {
        res.sendStatus(404);
    })
}