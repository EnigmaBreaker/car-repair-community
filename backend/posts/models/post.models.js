// It is the schema for the post. It contains fields which are stored in the database under name post.

const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    username : String,
    title : String,
    text : String,
    picture : String,
    comments : [String],
    likes : [String]
}, {
    timestamps : true
});

module.exports = mongoose.model('Post', PostSchema);