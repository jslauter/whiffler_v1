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
    answer:{
        type: String
    },
    userSubmittedAnswer:{
        type: String
    },
})


// quizSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Quiz', QuizSchema)