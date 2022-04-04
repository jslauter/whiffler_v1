const express = require('express');
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const session = require('express-session')
require('dotenv').config()
require('./server/models/database')
const cookieSession = require('cookie-session')
const passport = require('passport')
app.use(express.urlencoded({ extended: false }))


app.set('view engine', 'ejs')


app.use(express.static('public'))

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
}))

app.use(passport.initialize())
app.use(passport.session())




const routes = require('./server/routes/quizRoutes.js')
app.use('/', routes)

app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`))