module.exports = (app) => {
    const users = require('../controllers/user.controller.js');
    app.post('/signup', users.create);
    app.get('/user/:userName', users.findOne);
}