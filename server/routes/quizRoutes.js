const express = require('express')
const router = express.Router()
const quizController = require('../controllers/quizController')
const passportSetup = require('./passport-setup')
// const usernameSetup = require('./username-setup')
require('./username-setup')
const passport = require('passport')



/**
 * App Routes 
*/
const authCheck = (req, res, next)=>{
    if(!req.user){
        res.redirect('/')
    }else{
        next()
    }
}

//home GET page
router.get('/', quizController.homepage)

//home POST
router.post('/', quizController.homePost)

// about GET page
router.get('/about', (req, res)=>{
    res.render('about')
})

//profile GET page
router.get('/profile', quizController.profile);


//quiz GET page
router.get('/quiz', quizController.quiz)

//quiz POST route
router.post('/quiz', quizController.quizPost)

//quiz PUT route
router.put('/quiz/:id', quizController.quizSubmit)


//login GET page
router.get('/login', quizController.login)

//login POST
router.post('/login', passport.authenticate(['local', 'basic', 'passport-google-oauth'], { successRedirect: 'profile' }))


//profile GET
router.get('/profile', quizController.profile)

// register page / GOOGLE
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile/')
});


//register page / FACEBOOK
// router.get('/facebook', quizController.facebook)


// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    req.logout()
    res.redirect('/')
});



module.exports = router
