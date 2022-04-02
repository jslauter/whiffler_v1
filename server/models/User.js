const mongoose = require('mongoose')
const Schema = mongoose.Schema


const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    screenname: {
        type: String,
        required: true,
        unique: true
    },
    rank: {
        type: Number,
        required: true,
        unique: true
    },
    score: {
        type: Number,
        required: true,
    },
    rank: {
        type: Number,
        required: true,
    }
})



module.exports = mongoose.model('User', UserSchema);