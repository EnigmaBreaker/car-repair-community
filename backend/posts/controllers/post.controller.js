
const Post = require('../models/post.models.js');

exports.create = (req, res) => {
    const post = new Post({
        username : req.body.username,
        title : req.body.title,
        text : req.body.text,
        picture : req.file.filename,
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


// exports.findOne = (req, res) => {
//     User.findOne({username : req.params.userName}, "username email firstName lastName")
//     .then(data => {
//         res.send(data);
//     }).catch(err => {
//         res.status(500).send({
//             message : err.message || "Some error occured while retrieving user",
//         })
//     });
// };
