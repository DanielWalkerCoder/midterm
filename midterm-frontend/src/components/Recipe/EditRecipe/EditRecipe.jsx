import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setRecipes } from '../../../global/slices/recipesSlice'

const EditRecipe = () =>{
    const dispatch = useDispatch()
    const recipes = useSelector((state) => state.recipes.value);
    
    const [uniqueTagsArr, setUniqueTagsArr] = useState([]);
    const [recipeNamesArr, setRecipeNamesArr] = useState([]);
    const [selectedTag, setSelectedTag] = useState('Any tag');
    const [recipesWithTag, setRecipesWithTag] = useState(recipeNamesArr);
    const [selectedRecipe, setSelectedRecipe] = useState('I said CHOOSE!');
    const [selectedRecipeObj, setSelectedRecipeObj] = useState({});
    const [nameInput, setNameInput] = useState('');
    const [tagsInput, setTagsInput] = useState('');
    const [tagsList, setTagsList] = useState([]);
    const [cookedInput, setCookedInput] = useState([]);
    const [likedInput, setLikedInput] = useState([]);
    const [sourceInput, setSourceInput] = useState('');
    const [ingredientsInput, setIngredientsInput] = useState('');
    const [ingredientsList, setIngredientsList] = useState([]);
    const [directionsInput, setDirectionsInput] = useState('');
    const [directionsList, setDirectionsList] = useState([]);
    const [notesInput, setNotesInput] = useState('');
    
    useEffect(() => {
        //making uniqueTagsArr
        let tagsArr = []
        for(let i=0; i<recipes.length; i++){
            tagsArr = tagsArr.concat(recipes[i].tags)
        }
        let uTA = []
        for(let each of tagsArr){
            if(uTA.indexOf(each) === -1){
                uTA.push(each)
            }
        }
        uTA.sort((a,b) => a.toLowerCase() < b.toLowerCase() ? -1 : 1)
        setUniqueTagsArr(uTA)
        //making recipeNamesArr
        let rNA = []
        for(let i=0; i<recipes.length; i++){
            rNA.push(recipes[i].name)
        }
        rNA.sort((a,b) => a.toLowerCase() < b.toLowerCase() ? -1 : 1)
        setRecipeNamesArr(rNA)
        //making recipesWithTag
        if(selectedTag === "Any tag"){
            setRecipesWithTag(rNA)
        }else{
            let rWT = []
            for(let each of rNA){
                let foundRecipe = recipes.find(recipe => recipe.name === each)
                if(foundRecipe.tags.indexOf(selectedTag) !== -1){
                    rWT.push(each)
                }
            }
            setRecipesWithTag(rWT)
        }
    }, [recipes, selectedTag])

    const handleTagSelection = (e) =>{
        const newTag = e.target.value
        setSelectedTag(newTag)
        setSelectedRecipe("I said CHOOSE!")
        setSelectedRecipeObj({})
    }

    const handleRecipeSelection = (e) =>{
        const newRecipe = e.target.value
        if(newRecipe === 'I said CHOOSE!'){
            setSelectedRecipe(newRecipe)
            setSelectedRecipeObj({})
        }else{
            setSelectedRecipe(newRecipe)
            let foundRecipe = recipes.find(recipe => recipe.name === newRecipe)
            setNameInput(foundRecipe.name)
            setTagsList(foundRecipe.tags)
            setCookedInput(foundRecipe.cooked)
            setLikedInput(foundRecipe.liked)
            setSourceInput(foundRecipe.source)
            setIngredientsList(foundRecipe.ingredients)
            setDirectionsList(foundRecipe.directions)
            setNotesInput(foundRecipe.notes)
            setSelectedRecipeObj(foundRecipe)
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

    const deleteTag = (e, str)=>{
        e.preventDefault()
        let foundLoc = tagsList.indexOf(str)
        setTagsList(tagsList.slice(0,foundLoc).concat(tagsList.slice(foundLoc + 1, tagsList.length)))
    }
    const deleteIngredient = (e, str)=>{
        e.preventDefault()
        let foundLoc = ingredientsList.indexOf(str)
        setIngredientsList(ingredientsList.slice(0,foundLoc).concat(ingredientsList.slice(foundLoc + 1, ingredientsList.length)))
    }
    const deleteDirection = (e, str)=>{
        e.preventDefault()
        let foundLoc = directionsList.indexOf(str)
        setDirectionsList(directionsList.slice(0,foundLoc).concat(directionsList.slice(foundLoc + 1, directionsList.length)))
    }

    const handleOnSubmit = async (e)=>{
        e.preventDefault();
        try{
          const updatedRecipe = await axios.put(`http://localhost:3000/api/recipes/update-recipe-by-id/${selectedRecipeObj._id}`, {
            name: nameInput,
            tags: tagsList,
            cooked: parseInt(cookedInput),
            liked: parseInt(likedInput),
            source: sourceInput,
            ingredients: ingredientsList,
            directions: directionsList,
            notes: notesInput
            })
          dispatch(setRecipes(updatedRecipe.data.payload2))
        }catch(error){
          console.log(error)
        }
      }
    
    const handleOnDelete = async (e)=>{
        e.preventDefault();
        try{
          const updatedRecipeList = await axios.delete(`http://localhost:3000/api/recipes/delete-recipe-by-id/${selectedRecipeObj._id}`)
          dispatch(setRecipes(updatedRecipeList.data.payload2))
          setSelectedRecipe("I said CHOOSE!")
          setSelectedRecipeObj({})
        }catch(error){
          console.log(error)
        }
      }

    const handleOnUndo = ()=>{
        setNameInput(selectedRecipeObj.name)
        setTagsInput('')
        setTagsList(selectedRecipeObj.tags)
        setCookedInput(selectedRecipeObj.cooked)
        setLikedInput(selectedRecipeObj.liked)
        setSourceInput(selectedRecipeObj.source)
        setIngredientsInput('')
        setIngredientsList(selectedRecipeObj.ingredients)
        setDirectionsInput('')
        setDirectionsList(selectedRecipeObj.directions)
        setNotesInput(selectedRecipeObj.notes)
      }

    return(
        <>
            <h3>Edit a Recipe.</h3>
            <div>
                <label>
                    Choose a tag:
                    <select value={selectedTag} onChange={handleTagSelection}>
                        <option value="Any tag">Any tag</option>
                        {
                            uniqueTagsArr.map(tag =>{
                                return(
                                    <option key={tag} value={tag}>{tag}</option>
                                )
                            })
                        }
                    </select>
                </label>
                <label>
                    Choose a recipe:
                    <select value={selectedRecipe} onChange={handleRecipeSelection}>
                        <option value="I said CHOOSE!">I said CHOOSE!</option>
                        {
                            recipesWithTag.map(name =>{
                                return(
                                    <option key={name} value={name}>{name}</option>
                                )
                            })
                        }
                    </select>
                </label>
            </div>
            <div>
                {Object.keys(selectedRecipeObj).length === 0 ? null : (
                    <form onSubmit={handleOnSubmit}>
                        <br></br>
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
                                                {tag} <a href="#" onClick={(e)=>deleteTag(e, tag)}>delete</a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div>
                            Times Cooked: <input
                                type="text"
                                name="cookedInput"
                                onChange={e => setCookedInput(e.target.value)}
                                value = {cookedInput}
                            />
                        </div>
                        <div>
                            Liked: <input
                                type="text"
                                name="likedInput"
                                onChange={e => setLikedInput(e.target.value)}
                                value = {likedInput}
                            />
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
                                                {ingredient} <a href="#" onClick={(e)=>deleteIngredient(e, ingredient)}>delete</a>
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
                                                {direction} <a href="#" onClick={(e)=>deleteDirection(e, direction)}>delete</a>
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
                        <button type="submit">Update Recipe</button> <button type="button" onClick={handleOnUndo}>Undo Changes</button> <button type="button" onClick={handleOnDelete}>Delete Recipe</button>
                    </form>
                )}           
            </div>
        </>
    )
}

export default EditRecipe