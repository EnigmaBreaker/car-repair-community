const Post = require('../models/post.models.js');
var url = require('url');
var fs = require('fs');


// This is the function which is called when a post is created. It connects to the database and save the post over there. Saves image(if exist) locally and saves the image name(generated randomly) in the database.
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

// The function called when get image API is called. It takes imageId from the server for the post and returns the image to the client.
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

// It send the post info for the postId.
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
// It is the function to send all the available postId to the client. So that client can ask for any PostId they want.
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

// It is the function to add a comment into the database.
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

// It is the function to add like for a post. It push the userId, who have liked the post, to a list of all likes.  
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

// It is the function to dislike a post. It pops the userId out who has disliked the post.
exports.dislike = (req, res) => {
    var query = {'_id': req.params.postId};
    Post.findOneAndUpdate(query, {$pull: {likes: req.body.username}}, {new: true})
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message : err.message || "Some error occured while adding comment",
        })
    });
};

