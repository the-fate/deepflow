const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const Staff = require('../models/Staff');
const Student = require('../models/Student');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      Staff.findOne({
        email: email
      }).then(user => {
        if (!user) {
          Student.findOne({
            email: email
          }).then(user => {
              if (!user) {
                  return done(null, false, { message: 'That email is not registered'})
              }
              // A student
              // Match Student Password
              bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                  return done(null, user);
                } else {
                  return done(null, false, { message: 'Password incorrect' });
                }
              });
          });
        }

        // Is a staff

        // Match Staff password
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
    Staff.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
