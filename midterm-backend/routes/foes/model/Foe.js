const mongoose = require('mongoose')

const foeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    }
})

module.exports = mongoose.model('foe', foeSchema)