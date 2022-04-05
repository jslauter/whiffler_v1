const express = require('express');
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const session = require('express-session')
require('dotenv').config()
require('./server/models/database')
const passport = require('passport')
app.use(express.urlencoded({ extended: false }))
const MongoDBStore = require('connect-mongodb-session')(session);

app.set('view engine', 'ejs')


app.use(express.static('public'))

const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collections: 'sessions'
   });

 app.use(session({
     secret: process.env.SESSION_SECRET,
     resave: false,
     saveUninitialized: true,
     store: store,
     cookie: {
         maxAge: 1000*60*60*24
     }
 }))

app.use(passport.initialize())
app.use(passport.session())


const routes = require('./server/routes/quizRoutes.js')
app.use('/', routes)

app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`))