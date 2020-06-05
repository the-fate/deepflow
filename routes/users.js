var express  = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var passport = require('passport')
var session = require('express-session')
// var { authUser } = require('../config/auth')

// User model
var Staff = require('../models/Staff');
var Student = require('../models/Student');

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Staff Register Page
router.get('/staff/register', (req, res) => res.render('staff_register'));

// Staff Register Handle
router.post('/staff/register', (req, res) => {
    var { name, email, password, password2 } = req.body;
    
    let errors = [];

    // Check required fileds
    if(!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    // Check passwords match
    if(password !=password2){
        errors.push({ msg: 'Passwords do not match' });
    }

    // Check pass length
    if(password.length < 6){
        errors.push({ msg: 'Password should be at least 6 characters'});
    }

    // Check for errors
    if(errors.length > 0) {
        res.render('staff_register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        // Validation passed 
       Staff.findOne({ email: email }).then(user => {
                if(user) {
                    // Staff exists
                    errors.push({ msg: 'Email is already registered' });
                    res.render('staff_register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                } else {
                    const newStaff = new Staff({
                        name,
                        email,
                        password,
                        role: 'teacher'
                    });
                    
                  
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newStaff.password = hash;
              newStaff
                .save()
                .then(user => {
                    req.flash('success_msg', 'You are now registered and can log in');
                  res.redirect('/users/login');
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
  });

// Student Register Page
router.get('/student/register', (req, res) => res.render('student_register'));

// Student Register Handle
router.post('/student/register', (req, res) => {
    var { name, email, password, password2 } = req.body;
    
    let errors = [];

    // Check required fileds
    if(!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    // Check passwords match
    if(password !=password2){
        errors.push({ msg: 'Passwords do not match' });
    }

    // Check pass length
    if(password.length < 6){
        errors.push({ msg: 'Password should be at least 6 characters'});
    }

    // Check for errors
    if(errors.length > 0) {
        res.render('student_register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        // Validation passed 
       Student.findOne({ email: email }).then(user => {
                if(user) {
                    // Student exists
                    errors.push({ msg: 'Email is already registered' });
                    res.render('student_register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                } else {
                    // New student is created here. Need to update form: drop down to select class.
                    // Now it just assumes every registerd student is in the 1st Grade
                    const newStudent = new Student({
                        name,
                        email,
                        password,
                        class: '1'
                    });
                    
                  
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newStudent.password, salt, (err, hash) => {
              if (err) throw err;
              newStudent.password = hash;
              newStudent
                .save()
                .then(user => {
                    req.flash('success_msg', 'You are now registered and can log in');
                  res.redirect('/users/login');
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
  });


// Login Handle
router.post('/login',
 (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  console.log(email)

  Staff.findOne({  email : email}).then(function (user) {
    if (!user){
      Student.findOne({   email: email 
      }).then(function (user) {
        if (!user){
          req.flash('error_msg', 'User does not exist')
          res.redirect('./login');
        } else {
          // This is a student
         req.session.user = user.dataValues;
         res.redirect('/dashboard/student')
        }
      })
    } else {
      // This is a staff Log them in
      req.session.user = user.dataValues;
      res.redirect('/dashboard/teacher')
    }
  })
});
  
// Logout Handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

module.exports = router;