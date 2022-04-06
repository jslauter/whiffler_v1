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
    usersWhoAttempted: {
        type: Array
    },
    category: {
        type: String
    },
    chosenDefinition: {
        type: String
    },
    correctWord: {
        type: String
    },
    wrongWords:{
        type: Array
    },
    userSubmittedWord:{
        type: String
    }
})


// quizSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Quiz', QuizSchema)