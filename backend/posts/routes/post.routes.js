const multer = require('multer');
const upload = multer({dest: '../assets/images'});

module.exports = (app) => {
    const posts = require('../controllers/post.controller.js');
    app.post('/post', upload.single('image'), posts.create);
    // app.get('/post/:postId', posts.findOne);
}