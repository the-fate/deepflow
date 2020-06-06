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

// Staff Dashboard

router.get('/staff', ensureAuthenticated, (req, res) => 
res.render('staff_dashboard', {
    // To add username
    name: req.user.name
}));


module.exports = router;