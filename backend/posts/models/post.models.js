const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    username : String,
    title : String,
    text : String,
    picture : String,
    comments : [String],
    upvote : Number,
    downvote: Number
}, {
    timestamps : true
});

module.exports = mongoose.model('Post', PostSchema);