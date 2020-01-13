const Post = require('../models/post.models.js');
var url = require('url');
var fs = require('fs');

exports.create = (req, res) => {
    console.log("Entering");
    console.log(req.body);
    var pic = "";
    if (typeof req.file !== 'undefined') {
        pic = req.file.filename;
    }
    const post = new Post({
        username : req.body.username,
        title : req.body.title,
        text : req.body.text,
        picture : pic,
        comments : [],
        upvote : 0,
        downvote : 0,
    });

    post.save().
    then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message : err.message || "Some error occured while creating the User."
        });
    });
};

exports.getImage = (req, res) => {
    // var pic = req.url.split('/').splice(-1)[0];
    var pic = req.params.imageId;
    console.log(pic)
    fs.readFile('../assets/images/' + pic, (err, content) => {
        if (err) {
            res.writeHead(400, {'content-type': 'text/html'});
            console.log(err);
            res.end('No such post');
        }
        else {
            res.writeHead(200, {'content-type': 'image/jpg'});
            res.end(content);
        }
    })
}

exports.getPost = (req, res) => {
    Post.findById(req.params.postId)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message : err.message || "Some error occured while retrieving post",
        })
    });
};

exports.getPostIds = (req, res) => {
    Post.find({}).sort({createdAt: -1})
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message : err.message || "Some error occured while retrieving post ids",
        })
    });
};

exports.comment = (req, res) => {
    var query = {'_id': req.params.postId};
    console.log(req.body.comment);
    Post.findOneAndUpdate(query, {$push: {comments: req.body.comment}}, {new: true})
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message : err.message || "Some error occured while adding comment",
        })
    });
};

exports.like = (req, res) => {
    var query = {'_id': req.params.postId};
    Post.findOneAndUpdate(query, {$addToSet: {likes: req.body.username}}, {new: true})
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message : err.message || "Some error occured while adding comment",
        })
    });
};

