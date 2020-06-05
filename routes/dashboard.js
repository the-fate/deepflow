var express  = require('express');
var router = express.Router();
var { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
var session = require('express-session')


// Student Dashboard
router.get('/student', ensureAuthenticated, (req, res) =>
res.render('student_dashboard', {
    // To add Username
    name: req.user
}));

// Teacher Dashboard
router.get('/teacher', ensureAuthenticated, (req, res) => 
res.render('teacher_dashboard', {
    // To add username
    name: req.user
    // req.user.name
}));

// Headteacher Dashboard
router.get('/head-teacher', ensureAuthenticated, (req, res) => 
res.render('head_teacher_dashboard', {
    // To add Username
    name: req.user
}));

// Registrar Dashboard
router.get('/registrar',ensureAuthenticated, (req, res) => 
res.render('registrar_dashboard', {
    // To add Username
    user: req.user
}));

module.exports = router;