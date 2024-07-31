const mongoose = require('mongoose')

const treasureSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    }
})

module.exports = mongoose.model('treasure', treasureSchema)