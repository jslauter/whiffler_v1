const { compareSync } = require('bcrypt');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User')

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); } //When some error occurs

            if (!user) {  //When username is invalid
                return done(null, false, { message: 'Incorrect username.' });
            }

            if (!compareSync(password, user.password)) { //When password is invalid 
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user); //When user is valid
        });
    }
));

//Persists user data inside session
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

//Fetches session details using session id
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});