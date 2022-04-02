const express = require('express')
const router = express.Router()
const quizController = require('../controllers/quizController')


/**
 * App Routes 
*/
router.get('/', quizController.homepage)

//quiz page
router.get('/quiz', quizController.quiz)
router.post('/quiz',  (req, res) => {res.render('quiz')})

//profile page
router.get('/user/:id', (req, res) => {res.render('user')})
router.post('/user/:id', (req, res) => {res.render('user')})

//login page
router.get('/login', (req, res) => {res.render('login')})

//signup page
router.get('/signup',  (req, res) => {res.render('signup')})
router.post('/signup',  (req, res) => {res.render('signup')})





module.exports = router
