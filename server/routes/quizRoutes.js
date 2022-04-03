const express = require('express')
const router = express.Router()
const quizController = require('../controllers/quizController')
const passportSetup = require('./passport-setup')
const passport = require('passport')


/**
 * App Routes 
*/
const authCheck = (req, res, next)=>{
    if(!req.user){
        res.redirect('/login')
    }else{
        next()
    }
}

//home page
router.get('/', quizController.homepage)

//profile page
router.get('/profile', authCheck, quizController.profile);


//quiz page
router.get('/quiz', quizController.quiz)
// router.post('/quiz', quizController.quizPost)


//login page
router.get('/login', quizController.login)
router.post('/login', quizController.loginPost)

//register page MAIN PAGE
router.get('/register', quizController.register)
router.post('/register',  quizController.registerPost)

//register page / GOOGLE
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
    res.redirect('www.google.com');
});



module.exports = router
