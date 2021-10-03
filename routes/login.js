const router = require('express').Router();
let User = require('../models/user.model');
const auth = require('../controller/auth.controller.js')

router.route('/').post((req, res) => {
   
    auth.signin(req,res)
});

module.exports = router;