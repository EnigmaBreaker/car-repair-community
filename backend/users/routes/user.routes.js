// This contains routing for user. It calls a function in controller when some route is called for.

module.exports = (app) => {
    const users = require('../controllers/user.controller.js');
    app.post('/signup', users.create);
    app.get('/user/:username', users.findOne);
    app.post('/signin', users.signin);
}