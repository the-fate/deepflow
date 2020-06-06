var express  = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var passport = require('passport')
var { forwardAuthenticated } = require('../config/auth');

// User model
var Staff = require('../models/Staff');
var Student = require('../models/Student');

// Staff Register Page
router.get('/staff/register', forwardAuthenticated, (req, res) => res.render('staff_register'));

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

    // Check pass length: I removed this because it was inconvinient for testing
    // if(password.length < 6){
    //     errors.push({ msg: 'Password should be at least 6 characters'});
    // }

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

// Staff Login Page
router.get('/staff/login', forwardAuthenticated, (req, res) => res.render('staff_login'));

// Staff Login Handle
router.post('/staff/login', (req, res, next) => {
  passport.authenticate('staff-local', {

    // Passport redirects to /dashboard/staff after success and so on.
    successRedirect: '/dashboard/staff',
    failureRedirect: 'login',
    failureFlash: true
  })(req, res, next);
});
  
// Staff Logout Handle
router.get('/staff/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('login');
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
    // if(password.length < 6){
    //     errors.push({ msg: 'Password should be at least 6 characters'});
    // }

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
                    
        // Password is hashed here using bcrypt. I don't understand it. But it's supposedly
        // bad practice to store plain passwords on the DB.       
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newStudent.password, salt, (err, hash) => {
              if (err) throw err;
              newStudent.password = hash;
              newStudent
                .save() // Very important. It saves the new record to the DB
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


// Student Login Page
  router.get('/student/login', forwardAuthenticated, (req, res) => res.render('student_login'));

// Student Login Handle
router.post('/student/login', (req, res, next) => {
  passport.authenticate('student-local', {
    successRedirect: '/dashboard/student',
    failureRedirect: 'login',
    failureFlash: true
  })(req, res, next);
});
  
// Student Logout Handle
router.get('/student/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('login');
});



module.exports = router;