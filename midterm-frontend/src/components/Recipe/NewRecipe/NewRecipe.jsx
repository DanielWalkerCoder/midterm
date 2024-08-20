import React, { useState } from 'react';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { setRecipes } from '../../../global/slices/recipesSlice';

const NewRecipe = () => {
    const dispatch = useDispatch();
    const [nameInput, setNameInput] = useState('');
    const [tagsInput, setTagsInput] = useState('');
    const [tagsList, setTagsList] = useState([]);
    const [sourceInput, setSourceInput] = useState('');
    const [ingredientsInput, setIngredientsInput] = useState('');
    const [ingredientsList, setIngredientsList] = useState([]);
    const [directionsInput, setDirectionsInput] = useState('');
    const [directionsList, setDirectionsList] = useState([]);
    const [notesInput, setNotesInput] = useState('');
    const [randomRecipeText, setRandomRecipeText] = useState('');

    const clearForm = ()=>{
        setNameInput("")
        setTagsInput("")
        setSourceInput("")
        setIngredientsInput("")
        setDirectionsInput("")
        setNotesInput("")
        setTagsList([])
        setIngredientsList([])
        setDirectionsList([])
    }

    const handleOnSubmit = async (e)=>{
        e.preventDefault();
        try{
          const newRecipesList = await axios.post('http://localhost:3000/api/recipes/create-recipe', {
            name: nameInput,
            tags: tagsList,
            cooked: 0,
            liked: 0,
            source: sourceInput,
            ingredients: ingredientsList,
            directions: directionsList,
            notes: notesInput
            })
          dispatch(setRecipes(newRecipesList.data.payload2))
          clearForm()
        }catch(error){
          console.log(error)
        }
      }
    
    const addRandomRecipe = async (e)=>{
        e.preventDefault();
        try {
            let response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
            let newRandomRecipeObj = response.data.meals[0]
            let newRandomRecipeIngredients = []
            for(let i=1; i<21; i++){
                if(newRandomRecipeObj[`strIngredient${i}`] !== ''){
                    newRandomRecipeIngredients.push(newRandomRecipeObj[`strMeasure${i}`] + ' ' + newRandomRecipeObj[`strIngredient${i}`])
                }
            }
            const newRecipesList = await axios.post('http://localhost:3000/api/recipes/create-recipe', {
                name: newRandomRecipeObj.strMeal,
                tags: [newRandomRecipeObj.strArea, newRandomRecipeObj.strCategory.toLowerCase(), ...newRandomRecipeObj.strTags.toLowerCase().split(',')],
                cooked: 0,
                liked: 0,
                source: newRandomRecipeObj.strSource,
                ingredients: newRandomRecipeIngredients,
                directions: [newRandomRecipeObj.strInstructions],
                notes: ''
            })
            dispatch(setRecipes(newRecipesList.data.payload2))
            setRandomRecipeText(`New Recipe Added: ${newRandomRecipeObj.strMeal}`)
        } catch (error) {
            console.log(error)
        }
    }

    const addTag = ()=>{
        setTagsList(tagsList.concat(tagsInput))
        setTagsInput("")
    }
    const addIngredient = ()=>{
        setIngredientsList(ingredientsList.concat(ingredientsInput))
        setIngredientsInput("")
    }
    const addDirection = ()=>{
        setDirectionsList(directionsList.concat(directionsInput))
        setDirectionsInput("")
    }

    const deleteTag = (str)=>{
        let foundLoc = tagsList.indexOf(str)
        setTagsList(tagsList.slice(0,foundLoc).concat(tagsList.slice(foundLoc + 1, tagsList.length)))
    }
    const deleteIngredient = (str)=>{
        let foundLoc = ingredientsList.indexOf(str)
        setIngredientsList(ingredientsList.slice(0,foundLoc).concat(ingredientsList.slice(foundLoc + 1, ingredientsList.length)))
    }
    const deleteDirection = (str)=>{
        let foundLoc = directionsList.indexOf(str)
        setDirectionsList(directionsList.slice(0,foundLoc).concat(directionsList.slice(foundLoc + 1, directionsList.length)))
    }
    
    return (
        <>
            <div className="recipe-div">
                <form onSubmit={handleOnSubmit}>
                    <div>
                        Name: <input
                            type="text"
                            name="nameInput"
                            onChange={e => setNameInput(e.target.value)}
                            value = {nameInput}
                        />
                    </div>
                    <br></br>
                    <div>
                        Tags: <input
                            type="text"
                            name="tagsInput"
                            onChange={e => setTagsInput(e.target.value)}
                            value = {tagsInput}
                        />
                        <button type="button" onClick={addTag}>Add Tag</button>
                        <ul>
                            {
                                tagsList.map((tag, index) =>{
                                    return(
                                        <li key={index}>
                                            {tag} <a href="#" onClick={()=>deleteTag(tag)}>delete</a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div>
                        Source: <input
                            type="text"
                            name="sourceInput"
                            onChange={e => setSourceInput(e.target.value)}
                            value = {sourceInput}
                        />
                    </div>
                    <br></br>
                    <div>
                        Ingredients: <input
                            type="text"
                            name="ingredientsInput"
                            onChange={e => setIngredientsInput(e.target.value)}
                            value = {ingredientsInput}
                        />
                        <button type="button" onClick={addIngredient}>Add Ingredient</button>
                        <ul>
                            {
                                ingredientsList.map((ingredient, index) =>{
                                    return(
                                        <li key={index}>
                                            {ingredient} <a href="#" onClick={()=>deleteIngredient(ingredient)}>delete</a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div>
                        Directions: <input
                            type="text"
                            name="directionsInput"
                            onChange={e => setDirectionsInput(e.target.value)}
                            value = {directionsInput}
                        />
                        <button type="button" onClick={addDirection}>Add Direction</button>
                        <ul>
                            {
                                directionsList.map((direction, index) =>{
                                    return(
                                        <li key={index}>
                                            {direction} <a href="#" onClick={()=>deleteDirection(direction)}>delete</a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div>
                        Notes: <input
                            type="text"
                            name="notesInput"
                            onChange={e => setNotesInput(e.target.value)}
                            value = {notesInput}
                        />
                    </div>
                    <br></br>
                    <button type="submit">Add New Recipe</button> <button type="button" onClick={clearForm}>Cancel</button>
                </form>
            </div>
            <br></br>
            <div className='newRandom'>
                <button type="button" onClick={addRandomRecipe}>Fetch New Random Recipe</button>
                <p>{randomRecipeText}</p>
            </div>
        </>
    )   
}

export default NewRecipe;