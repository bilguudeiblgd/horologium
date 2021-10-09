const router = require('express').Router();
let User = require('../models/user.model');

// everything related to subjects

// Show all subjects that user has

router.route('/:id/').get((req, res) => {
    console.log("working");

    User.findById(req.params.id)
        .then((user) => {
            res.json(user.subjects);
        })
        .catch(err => res.status(400).json("Error occured"));
});
router.route('/:id/add/').post((req, res) => {
    const subjectname = req.body.subjectname;
    const value = 0;

    User.findById(req.params.id)
        .then(user => {
            user.subjects.push({ subjectname: subjectname, studied: value });
            user.save();
            res.json(user.subjects);
        })
        .catch(err => res.status(400).json("Error, something is wrong " + err))
});
router.route('/:id/delete').delete((req, res) => {
    const subjectname = req.body.subjectname;
    User.updateOne({ "_id": req.params.id }, { $pull: { "subjects": { "subjectname": subjectname } } }, { safe: true, multi: true })
        .then(user => {
            User.findById(req.params.id)
                .then(user => {
                    res.json(user.subjects);
                })
        })
        .catch(err => {
            console.log(err);
        })


});
// Post the time 

router.route('/:id/:subject').post((req, res) => {

    const subject = req.params.subject;
    const studyAdd = Number(req.body.studyadd);

    User.findById(req.params.id)
        .then((user) => {
            const subjects = user.subjects;
            const userSubject = subjects.filter(subj => subj.subjectname === subject)[0];
            let studytime = userSubject.studied + studyAdd;
            userSubject.studied = studytime;
            user.save();
            res.json(userSubject);
        })
        .catch(err => console.log("Error in posting to subject study hour"));


});

router.route('/:id/:subject').get((req, res) => {
    console.log("working");
    const subject = req.params.subject;

    User.findById(req.params.id)
        .then((user) => {
            const subjects = user.subjects;
            const userSubject = subjects.filter(subj => subj.subjectname === subject)
            res.json(userSubject);
        })
        .catch(err => res.status(400).json("Error occured"));
});

module.exports = router;
