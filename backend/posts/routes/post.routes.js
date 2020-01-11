module.exports = (app) => {
    const users = require('../controllers/post.controller.js');
    app.post('/post', posts.create);
    app.get('/post/:postId', posts.findOne);
}