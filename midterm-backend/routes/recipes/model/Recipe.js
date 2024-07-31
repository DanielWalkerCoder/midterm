const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    tags: {
        type: Array
    },
    cooked: {
        type: Number
    },
    liked: {
        type: Number
    },
    source: {
        type: String
    },
    ingredients: {
        type: Array
    },
    directions: {
        type: String
    },
    notes: {
        type: String
    },
})

module.exports = mongoose.model('recipe', recipeSchema)