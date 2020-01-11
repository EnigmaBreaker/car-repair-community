const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email : { type: String, unique: true },
    username : { type: String, unique: true },
    password : String,
    firstName : String,
    lastName : String,
    Upvotes: [String],
    Downvotes: [String]
}, {
    timestamps : true
});

module.exports = mongoose.model('User', UserSchema);
