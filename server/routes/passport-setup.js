const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
require('dotenv').config()
const User = require('../models/User')

passport.serializeUser((user, done)=>{
   done(null, user.id)
})
passport.deserializeUser((id, done)=>{
    User.findById(id).then((user)=>{
        done(null, user)
    })
})

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: '/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
       console.log(profile)
        // passport callback function
        User.findOne({googleId: profile.id}).then((currentUser)=>{
            if(currentUser){
                console.log('user is: ' , currentUser)
                done(null, currentUser)
            }else{
                new User({
                    username: profile.displayName,
                    googleId: profile.id,
                    thumbnail: profile._json.picture
                }).save().then((newUser) => {
                    console.log('new user created:' + newUser)
                    done(null, newUser)
                })
            }
        })
    })
);