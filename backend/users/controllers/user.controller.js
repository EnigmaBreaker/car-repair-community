const User = require('../models/user.model.js');


exports.create = (req, res) => {
    // console.log(req.body);
    const user = new User({
        email : req.body.email,
        username : req.body.username,
        password : req.body.password,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
    });

    user.save().
    then(data => {
        res.send({status : true});
    }).catch(err => {
        res.status(500).send({
            message : err.message || "Some error occured while creating the User."
        });
    });
};

exports.signin = (req, res) => {
    // console.log(req.body);
    User.findOne({username : req.body.username, password : req.body.password}).
    then(data => {
        if(data === null){
            res.send({status : false});
        }
        else{
            res.send({status : true});
        }
    }).catch(err => {
        res.status(500).send({
            message : err.message || "Some error occured while creating the User."
        });
    });
}

exports.findOne = (req, res) => {
    User.findOne({username : req.params.username})
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message : err.message || "Some error occured while retrieving user",
        })
    });
};
