let User = require('../models/user.model');

let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
    // console.log(req.body);
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        subjects: []
    })
    
    user.save()
    .then(() => {
        res.json("User added");
    })
    .catch(err => {
        res.status(400).json("Error " + err);
    });
    
}

exports.signin = (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .then((user) => {
            console.log(req.body);
            if (!user) {
                return res.status(404).send({ message: "User Not found." })
            }

            let passwordValid = bcrypt.compareSync(
                req.body.password,
                user.password,
            )

            if (!passwordValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
            let token = jwt.sign({ id: user.id }, 'naruto34', {
                expiresIn: 2592000 // 3o day
            });

            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                subject: [],
                accessToken: token
            });
        })
        .catch(err => {
            console.log(err);
            res.status(400).json("error");
        })
        
}