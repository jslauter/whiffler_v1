const mongoose = require('mongoose')


const QuizSchema = new mongoose.Schema({
    screenname: {
        type: String,
    },
    correctWord: {
        type: String,
        required: true,
    },
    wrongWords: {
        type: String,
        required: true,
    },
    answer:{
        type: String
    },
    wrongAnswers:{
        type: Array
    },
    userSubmittedAnswer:{
        type: String
    },
    creatorPoint:{
        type: Number
    }
})


// quizSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Quiz', QuizSchema)