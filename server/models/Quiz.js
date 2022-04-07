const mongoose = require('mongoose')


const QuizSchema = new mongoose.Schema({
    quizCreator: {
        type: String,
    },
    quizCreatorThumbnail: {
        type: String,
    },
    chosenWord: {
        type: String,
    },
    wrongDefs: {
        type: Array,
    },
    correctDefinition:{
        type: String
    },
    userSubmittedDefinition:{
        type: String
    },
    chosenDefinition: {
        type: String
    },
    correctWord: {
        type: String
    },
    wrongWords:{
        type: Array,
    },
    userSubmittedWord:{
        type: String
    },
    category:{
        type: String,
        default: 0
    },
    usersWhoCompleted: [{
        type: String
    }]
})


module.exports = mongoose.model('Quiz', QuizSchema)