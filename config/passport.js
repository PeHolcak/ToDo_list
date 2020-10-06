
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = function (passport) {
    passport.use(new LocalStrategy({ usernameField: "username" }, (email, password, done) => {
        User.findOne({ email: email }).then(user => {
            if (!user) {
                null, false, { message: "That email is not registred" }
            }
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user)
                }
                else {
                    return done(null, false, { message: "Password is incorect" })
                }


            })
        }).catch(err => console.log(err))
    }))

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}