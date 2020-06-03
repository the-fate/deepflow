var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Load User Model
var Staff = require('../models/Staff');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // Match User
            Staff.findOne({ email: email })
                .then(user => {
                    if(!user){
                        return done(null, false, {message: 'That email is not registered'});
                    }

                    // Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err;

                        if (isMatch){
                            return done(null, user);
                        } else {
                            return done(null, false, {message: 'Passsword incorrect'});
                        }
                
                    });
                })
                .catch(err => console.log(err));
        })
    );

    passport.serializeUser(function(user, done) { 
        done(null, user.id);
      });

    //   Callback done in another way other than the arrow
      passport.deserializeUser(function(id, done) {
        Staff.findById(id, function(err, user) {
          done(err, user);
        });
      });   
}