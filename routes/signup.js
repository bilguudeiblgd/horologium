const router = require('express').Router();
let User = require('../models/user.model');
const auth = require('../controller/auth.controller.js')

router.route('/').post((req, res) => {
    // User.drop();
    // console.log("signup", req);
    User.findOne({
        username: req.body.username,
    })
        .then((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (user) {
                
                res.status(400).send({ message: "Failed! Username is already in use!" });
                return;
            }
        })
    User.findOne({
        email: req.body.email
    }).then((user) => {
        
        if (user) {
            console.log(user);
            res.status(400).send({ message: "Failed! Email is already in use!" });
            return;
        }
        auth.signup(req, res);
        
    }).catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;