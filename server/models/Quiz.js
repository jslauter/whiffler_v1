const mongoose = require('mongoose')


const QuizSchema = new mongoose.Schema({
    quizCreator: {
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
    category:{
        type: String,
        default: 0
    },
    usersWhoCompleted: {
        type: Array,
        default: []
    }
})


module.exports = mongoose.model('Quiz', QuizSchema)