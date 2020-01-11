const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email : { type: String, unique: true },
    username : { type: String, unique: true },
    password : String,
    firstName : String,
    lastName : String,
<<<<<<< HEAD
    posts : [String],
=======
    Upvotes: [String],
    Downvotes: [String]
>>>>>>> 3c3b4058fdcf2dc071ca3f6f198b1dc51b188b78
}, {
    timestamps : true
});

module.exports = mongoose.model('User', UserSchema);
