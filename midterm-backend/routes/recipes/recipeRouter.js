const express = require('express')
const router = express.Router()

const {
    getAllRecipes,
    getRecipeByID,
    getRecipeByName,
    createRecipe,
    updateRecipeByID,
    deleteRecipeByID
} = require ('./controller/recipeController')

router.get('/get-all-recipes', getAllRecipes)
router.get('/get-recipe-by-id/:id', getRecipeByID)
router.get('/get-recipe-by-name/:name', getRecipeByName)
router.post('/create-recipe', createRecipe)
router.put('/update-recipe-by-id/:id', updateRecipeByID)
router.delete('/delete-recipe-by-id/:id', deleteRecipeByID)

module.exports = router