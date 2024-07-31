const mongoose = require('mongoose')

const expSchema = new mongoose.Schema({
    points: {
        type: Number
    }
})

module.exports = mongoose.model('exp', expSchema)