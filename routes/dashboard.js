var express  = require('express');
var router = express.Router();
var { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
var session = require('express-session')


// Student Dashboard
router.get('/student', ensureAuthenticated, (req, res) =>
res.render('student_dashboard', {
    // To add Username
    name: req.user.name
}));

router.get('/student/mysubjects', ensureAuthenticated, (req, res) =>
res.render('student_dashboard_mysubjects', {
    name: req.user.name,
    subjects: req.user.subjects
}));

// Staff Dashboard

router.get('/staff', ensureAuthenticated, (req, res) => 
res.render('staff_dashboard', {
    // To add username
    name: req.user.name
}));

router.get('/admin', (req,res) =>
res.render('admin_dashboard', {

}));


module.exports = router;