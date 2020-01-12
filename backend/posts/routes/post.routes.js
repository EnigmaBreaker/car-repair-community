const multer = require('multer');
const upload = multer({dest: '../assets/images'});

module.exports = (app) => {
    const posts = require('../controllers/post.controller.js');
    app.post('/post', upload.single('image'), posts.create);
    app.get('/image/:imageId', posts.getImage);
    app.get('/post/:postId', posts.getPost);
    app.get('/posts', posts.getPostIds);
    app.post('/comment/:postId', posts.comment);
}