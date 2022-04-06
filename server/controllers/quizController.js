require('../models/database')
const User = require('../models/User')
require('../models/Quiz')
const Quiz = require('../models/Quiz')
const axios = require('axios')
var unirest = require("unirest");
const { append } = require('express/lib/response');
const yandexKey = process.env.YANDEXKEY
const dictionaryapiKey = process.env.DICTIONARYAPIKEY
const dictionaryApiBaseUrl = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/`
const { hashSync } = require('bcrypt');


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
 * Home / Register
*/
exports.homepage = (req, res) => {
    res.render('index', { title: 'Whiffler - Main Feed', user: req.user } )
   }

   /**
 * POST /
 * Home /Register 
*/
exports.homePost = async (req, res) => {
    let user = new User({
        username: req.body.username,
        password: hashSync(req.body.password, 10)
    })

    user.save().then(user => console.log(user));

    res.redirect('login')
}

/**
 * GET /
 * Profile
*/
// exports.profile = async (req, res) => {
//     res.send('/');
// }


/**
 * GET /
 * Login 
*/
exports.login = async (req, res) => {
    res.render('login')
}

/**
 * GET /
 * PROFILE 
*/
exports.profile = async (req, res) => {
    if (req.isAuthenticated()) {
        res.render('profile', { user: req.user })
    } else {
        res.render('index')
    }
    console.log(req.session)
    console.log(req.user)
}

/**
 * GET /
 * logout 
*/
// exports.logout = (req, res) => {
//     req.logout();
//     res.redirect('/login')
// }

/**
 * GET /
 * Google 
*/
exports.google = async (req, res) => {
    res.render('google')
}
