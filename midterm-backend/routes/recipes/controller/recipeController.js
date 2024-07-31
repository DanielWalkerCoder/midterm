const Recipe = require('../model/Recipe')

async function getAllRecipes(req, res){
    try {
        const foundRecipes = await Recipe.find({})
        res.json({message: "Recipes found.", payload: foundRecipes})
    } catch (error) {
        res.status(500).json({message: "Error", error: error})
    }
}

async function getRecipeByID(req, res){
    try {
        const foundRecipe = await Recipe.findOne({_id: req.params.id})
        res.json({message: "Recipe found.", payload: foundRecipe})
    } catch (error) {
        res.status(500).json({message: "Error", error: error})
    }
}

async function getRecipeByName(req, res){
    try {
        const foundRecipe = await Recipe.findOne({name: req.params.id})
        res.json({message: "Recipe found.", payload: foundRecipe})
    } catch (error) {
        res.status(500).json({message: "Error", error: error})
    }
}

async function createRecipe(req, res){
    try {
        const newRecipe = new Recipe({...req.body
        })
        const savedRecipe = await newRecipe.save()
        const updatedRecipes = await Recipe.find({})
        res.json({message: "Recipe created.", payload1: savedRecipe, payload2: updatedRecipes})
    } catch (error) {
        res.status(500).json({message: "Error", error: error})
    }
}

async function updateRecipeByID(req, res){
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, {...req.body}, {new: true})
        const updatedRecipes = await Recipe.find({})
        res.json({message: "Recipe updated.", payload1: updatedRecipe, payload2: updatedRecipes})
    } catch (error) {
        res.status(500).json({message: "Error", error: error})
    }
}

async function deleteRecipeByID(req, res){
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id)
        const updatedRecipes = await Recipe.find({})
        res.json({message: "Recipe deleted.", payload1: deletedRecipe, payload2: updatedRecipes})
    } catch (error) {
        res.status(500).json({message: "Error", error: error})
    }
}

module.exports = {
    getAllRecipes,
    getRecipeByID,
    getRecipeByName,
    createRecipe,
    updateRecipeByID,
    deleteRecipeByID
}