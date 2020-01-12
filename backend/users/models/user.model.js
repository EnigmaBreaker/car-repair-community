const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


const UserSchema = mongoose.Schema({
    email : { type: String, required: true, unique: true, index: true},
    username : { type: String, required: true, unique: true, index: true},
    password : {type: String, required: true},
    firstName : {type: String, required: true},
    lastName : {type: String, required: true},
    posts : [String],
}, {
    timestamps : true
});

UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', UserSchema);
