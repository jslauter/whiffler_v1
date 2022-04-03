require('../models/database')
require('../models/User')
require('../models/Quiz')
const Quiz = require('../models/Quiz')
const axios = require('axios')
var unirest = require("unirest");
const { append } = require('express/lib/response');
const yandexKey = process.env.YANDEXKEY
const dictionaryapiKey = process.env.DICTIONARYAPIKEY
const dictionaryApiBaseUrl = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/`


/**
 * GET /
 * Homepage 
*/
exports.homepage = (req, res) => {
 res.render('index', { title: 'Whiffler - Main Feed' } )
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


/**
 * GET /
 * Home 
*/
exports.homepage = (req, res) => {
    res.render('index', { title: 'Whiffler - Main Feed' } )
   }

/**
 * GET /
 * Profile 
*/
exports.profile = async  (req, res) => {
    res.render('profile', { user: req.user });
}

/**
 * GET /
 * Register 
*/
exports.register = async (req, res) => {
    res.render('register', {title: 'Whiffler - Register Page'} )
}

/**
 * POST /
 * Register 
*/
exports.registerPost = async (req, res) => {
    res.render('register', {title: 'Whiffler - Register Page'} )
}

/**
 * GET /
 * Login 
*/
exports.login = async (req, res) => {
    res.render('login', {title: 'Whiffler - Login Page'} )
}

/**
 * POST /
 * Login 
*/
exports.loginPost = async (req, res) => {
    res.render('login', {title: 'Whiffler - Quiz Page'} )
}

/**
 * GET /
 * logout 
*/
// exports.logout = (req, res) => {
//     req.logout()
//     res.redirect('/login')
// }

/**
 * GET /
 * Google 
*/
exports.google = async (req, res) => {
    res.render('google')
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