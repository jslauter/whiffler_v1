require('../models/database')
require('../models/User')
require('../models/Quiz')
const Quiz = require('../models/Quiz')
const axios = require('axios')
var unirest = require("unirest")
const yandexKey = process.env.YANDEXKEY
const dictionaryapiKey = process.env.DICTIONARYAPIKEY
const dictionaryApiBaseUrl = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/`



/**
 * GET /
 * Homepage 
*/
exports.homepage = (req, res) => {
 res.render('index', { title: 'Whiffler - Home' } )
}



// Fetch Words
const getDictionaryWord = async()=>{
    const res = await axios.get(`https://random-word-api.herokuapp.com/word?number=4`)
    return res.data
}

//Create Word:Defintion Object
const getDefinitions = async()=>{
    const words = await getDictionaryWord()
    const wordDefinitionObj = {}

    for(const word of words){
        const definitions = await axios.get(`${dictionaryApiBaseUrl}${word}?key=${dictionaryapiKey}`)
        wordDefinitionObj[word] = definitions.data[0].shortdef[0]
    }
    return wordDefinitionObj
}

//Fetch UrbanDicitonary
const urbanDictionary = async()=>{
    const res = await axios.get(`https://api.urbandictionary.com/v0/random`)
    return res.data
}


/**
 * GET /
 * Quiz 
*/
exports.quiz = async (req, res) => {
    const wordDefinitionObj = {}
    const wrongDefintionObj = []

    const urbanWords = await urbanDictionary()
    urbanWords.list.forEach((el)=>{
        wordDefinitionObj[el.word] = el.definition.split('. ', 1)[0].replace(/[\[\]']+/g,'')
    })
    // const wrongDefs = await urbanDictionary()
    // wrongDefs.list.forEach((el)=>{
    //     wrongDefintionObj.push(el.definition.split('. ', 1)[0].replace(/[\[\]']+/g,''))
    // })
    res.render('quiz', {title: 'Whiffler - Quiz Page', wordDefinitionObj} )
}



//  screenname: {
//         type: String,
//     },
//     correctWord: {
//         type: String,
//         required: true,
//     },
//     wrongWords: {
//         type: String,
//         required: true,
//     },
//     answer:{
//         type: String
//     },
//     wrongAnswers:{
//         type: Array
//     },
//     userSubmittedAnswer:{
//         type: String
//     },
//     creatorPoint:{
//         type: Number
//     }






// //homepage
// app.get('/:id',(req, res) => {res.render('index')})

// //profile page
// app.get('/user/:id', (req, res) => {res.render('user')})
// app.post('/user/:id', (req, res) => {res.render('user')})

// //login page
// app.get('/login', (req, res) => {res.render('index')})

// //signup page
// app.get('/signup',  (req, res) => {res.render('index')})
// app.post('/signup',  (req, res) => {res.render('index')})