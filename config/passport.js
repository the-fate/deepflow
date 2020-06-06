const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const Staff = require('../models/Staff');
const Student = require('../models/Student')


function isStaffe(user){
  Staff.findOne({email: user.email}).then(user => {
    if(!user) {
      return false
    }
    return true
  })
};

function isStaffi(user){
  Staff.findById(user).then(user => {
    if(!user){
      return false
    }
    return true
  })
};

function isStudente(user){
  Student.findOne({email: user.email}).then(user => {
    if(!user) {
      return false
    }
    return true
  })
};

function isStudenti(user){
  Student.findById(user).then(user => {
    if(!user){
      return false
    }
    return true
  })
};

module.exports = function(passport) {
  passport.use('staff-local',
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      Staff.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.use('student-local',
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    // Match user
    Student.findOne({
      email: email
    }).then(user => {
      if (!user) {
        return done(null, false, { message: 'That email is not registered' });
      }

      // Match password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Password incorrect' });
        }
      });
    });
  })
);

  passport.serializeUser(function(user, done) {
  
      done(null, user.id);
  
 
  });

  passport.deserializeUser(function(id, done) {

  Staff.findById(id, function (err, user){
    if(!user){
      Student.findById(id, function(err, auser){
     
        done(err, auser);
      })
    } else {
      done(err, user);
    }

   
  });
  
  //   Staff.findById(id, function(err, user) {
  //     done(err, user);
  //   });

  
  //   Student.findById(id, function(err, user) {
  //     done(err, user);
  // });
})};
