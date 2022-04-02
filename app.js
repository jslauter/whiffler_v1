const express = require('express');
const app = express()
const PORT = 3000

app.set('view engine', 'ejs')

app.use(express.static('public'))
require('dotenv').config()

const routes = require('./server/routes/quizRoutes.js')
app.use('/', routes)









app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`))