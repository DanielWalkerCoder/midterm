const mongoose = require('mongoose')

const weaponSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    }
})

module.exports = mongoose.model('weapon', weaponSchema)