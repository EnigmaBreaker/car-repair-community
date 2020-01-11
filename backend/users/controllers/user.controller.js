const User = require('../models/user.model.js');


exports.create = (req, res) => {
    const user = new User({
        email : req.body.email,
        username : req.body.username,
        password : req.body.password,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
    });

    user.save().
    then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message : err.message || "Some error occured while creating the User."
        });
    });
};

exports.findOne = (req, res) => {
    User.findOne({username : req.params.userName}, "username email firstName lastName")
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message : err.message || "Some error occured while retrieving user",
        })
    });
};
