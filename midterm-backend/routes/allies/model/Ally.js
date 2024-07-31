const mongoose = require('mongoose')

const allySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    }
})

module.exports = mongoose.model('ally', allySchema)