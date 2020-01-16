// This file contain the API function which are run on the backend when any API is called. 

const User = require('../models/user.model.js');

// The function to create new user. This is called when a new user tries to singup. It connects with the database and save the new user in the database.
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


// The function to signin. It send positive response if user exist and negative if it does not.
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

// It is just a function to get the data of a username. Though it is not used anywhere. Just made it in the start.
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
