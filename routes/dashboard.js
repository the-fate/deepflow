var express  = require('express');
var router = express.Router();
var { authUser } = require('../config/auth');
var session = require('express-session')


// Student Dashboard
router.get('/student', authUser, (req, res) =>
res.render('student_dashboard', {
    // To add Username
    name: "To add student name here"
}));

// Teacher Dashboard
router.get('/teacher', authUser, (req, res) => 
res.render('teacher_dashboard', {
    // To add username
    name: "req.user.name"
    // req.user.name
}));

// Headteacher Dashboard
router.get('/head-teacher', authUser, (req, res) => 
res.render('head_teacher_dashboard', {
    // To add Username
    name: "req.user.name"
}));

// Registrar Dashboard
router.get('/registrar',authUser, (req, res) => 
res.render('registrar_dashboard', {
    // To add Username
    name: "req.user.name"
}));

module.exports = router;