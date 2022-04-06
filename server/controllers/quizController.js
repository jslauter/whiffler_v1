require('../models/database')
const User = require('../models/User')
require('../models/Quiz')
const Quiz = require('../models/Quiz')
const axios = require('axios')
var unirest = require("unirest")
const { append, render } = require('express/lib/response')
const yandexKey = process.env.YANDEXKEY
const dictionaryapiKey = process.env.DICTIONARYAPIKEY
const dictionaryApiBaseUrl = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/`
const { hashSync } = require('bcrypt')
const { RandomPicture } = require('random-picture')



/**
 * GET /
 * Homepage 
*/
exports.homepage = (req, res) => {
 res.render('index', { title: 'Whiffler - Main Feed' } )
}


//Fetch UrbanDicitonary
const urbanDictionary = async()=>{
    const res = await axios.get(`https://api.urbandictionary.com/v0/random`)
    return res.data
}

const wordDefinitionObj = {}

/**
 * GET /
 * Quiz 
*/
exports.quiz = async (req, res) => {
    const wordDefinitionObj = {}

    const urbanWords = await urbanDictionary()
    urbanWords.list.forEach((el)=>{
        
        wordDefinitionObj[el.word] = el.definition.replace(/[\[\]']+/g,'').split('. ', 1)[0]
    })
    res.render('quiz', {title: 'Whiffler - Quiz Page', wordDefinitionObj} )
}


/**
 * POST /
 * Quiz 
*/
exports.quizPost = async (req, res) => {
    const wrongDefinitions = []

    const urbanWords = await urbanDictionary()
    
    urbanWords.list.forEach((el)=>{
        wrongDefinitions.push(el.definition.split('. ', 1)[0].replace(/[\[\]']+/g,''))
        console.log(el.definition.split('. ', 1)[0])
    })

    const wordArr = req.body.quizWords.split(/,,/)

    wrongDefinitions.splice(4)
    //correct definition
    wrongDefinitions.push(wordArr[1])

    //user submitted definition
    wrongDefinitions.push(req.body.userDefinition)

    //shuffle definitions array
    let shuffled = wrongDefinitions
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    
    //create quiz
    let quiz = new Quiz({
        quizCreator: req.user.username,
        chosenWord: wordArr[0],
        correctDefinition:  wordArr[1],
        wrongDefs: shuffled,
        userSubmittedDefinition: req.body.userDefinition
    })
    await quiz.save()
    res.redirect('profile')
}


/**
 * PUT /
 * Home / Register
*/
exports.quizSubmit = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id)

        if(req.body.flexRadioDefault == quiz.correctDefinition){
            await User.findOneAndUpdate({username : req.user.username},{$inc: { score: 2 }})
        }else if(req.body.flexRadioDefault == quiz.userSubmittedDefinition){
            await User.findOneAndUpdate({username : quiz.quizCreator},{$inc: { score: 1 }})
        }
        //add user to users who've completed array here

        //figure out redirect


        }catch (err) {
        console.log(err)
      }
      res.redirect('/profile/')
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
    const image = await RandomPicture()
    .then(url => {
        return url;
    })
    
    
    let user = new User({
        username: req.body.username,
        password: hashSync(req.body.password, 10),
        thumbnail: image.url
    })

    await user.save()

    res.redirect('login')
}

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
        const limitNumber = 10
        const quizzes = await Quiz.find({}).limit(limitNumber)
        res.render('profile', { user: req.user, quizzes })
    } else {
        res.render('index')
    }
}


/**
 * GET /
 * Google 
*/
exports.google = async (req, res) => {
    res.render('google')
}

// Fetch Words
// const getDictionaryWord = async()=>{
//     const res = await axios.get(`https://random-word-api.herokuapp.com/word?number=4`)
//     return res.data
// }


//Create Word:Defintion Object
// const getDefinitions = async()=>{
//     const words = await getDictionaryWord()
//     const wordDefinitionObj = {}

//     for(const word of words){
//         const definitions = await axios.get(`${dictionaryApiBaseUrl}${word}?key=${dictionaryapiKey}`)
//         wordDefinitionObj[word] = definitions.data[0].shortdef[0]
//     }
//     return wordDefinitionObj
// }