import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setRecipes } from '../../../global/slices/recipesSlice'

const Rematch = () =>{
    const dispatch = useDispatch()
    const recipes = useSelector((state) => state.recipes.value);
    
    const [uniqueTagsArr, setUniqueTagsArr] = useState([]);
    const [recipeNamesArr, setRecipeNamesArr] = useState([]);
    const [selectedTag, setSelectedTag] = useState('Any tag');
    const [recipesWithTag, setRecipesWithTag] = useState(recipeNamesArr);
    const [selectedRecipe, setSelectedRecipe] = useState('I said CHOOSE!');
    const [selectedRecipeObj, setSelectedRecipeObj] = useState({});
    
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
            setSelectedRecipeObj(foundRecipe)
        }
    }

    const handleClickCookButton = async () => {
        const updatedRecipeObj = {
            ...selectedRecipeObj,
            cooked: selectedRecipeObj.cooked + 1
        };
        setSelectedRecipeObj(updatedRecipeObj);
        try {
            const updatedRecipe = await axios.put(`http://localhost:3000/api/recipes/update-recipe-by-id/${selectedRecipeObj._id}`, { cooked: updatedRecipeObj.cooked });
            dispatch(setRecipes(updatedRecipe.data.payload2));
        } catch (error) {
            console.log(error);
        }
    }

    const handleClickLikeButton = async () => {
        const updatedRecipeObj = {
            ...selectedRecipeObj,
            liked: selectedRecipeObj.liked + 1
        };
        setSelectedRecipeObj(updatedRecipeObj);
        try {
            const updatedRecipe = await axios.put(`http://localhost:3000/api/recipes/update-recipe-by-id/${selectedRecipeObj._id}`, { liked: updatedRecipeObj.liked });
            dispatch(setRecipes(updatedRecipe.data.payload2));
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>
            <h3>Cook something to distract it with!</h3>
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
                    <div>
                        <br></br>
                        <p>Name: {selectedRecipeObj.name}</p>
                        <p>Tags:</p>
                        <ul>
                        {
                            selectedRecipeObj.tags.map(tag =>{
                            return(
                                <li>{tag}</li>
                            )
                            })
                        }
                        </ul>
                        <p>Times Cooked: {selectedRecipeObj.cooked}</p>
                        <p>Likes: {selectedRecipeObj.liked}</p>
                        <p>Source: {selectedRecipeObj.source}</p>
                        <p>Ingredients:</p>
                        <ul>
                            {
                                selectedRecipeObj.ingredients.map(ingredient =>{
                                return(
                                    <li>{ingredient}</li>
                                )
                                })
                            }
                        </ul>
                        <p>Directions:</p>
                        <ol>
                            {
                                selectedRecipeObj.directions.map(direction =>{
                                return(
                                    <li>{direction}</li>
                                )
                                })
                            }
                        </ol>
                        <p>Notes: {selectedRecipeObj.notes}</p>
                        <button type="button" id="cook" onClick={handleClickCookButton}>Cook</button>
                        <button type="button" id="like" onClick={handleClickLikeButton}>Received Like</button>
                    </div>
                )}           
            </div>
        </>
    )
}

export default Rematch