import React from 'react';
import { useSelector } from 'react-redux';

const DisplayRecipeNames = () => {
    const recipes = useSelector((state) => state.recipes.value);
  
    return(
        <>
            <h2>Recipe Names</h2>
            <div>
                <ul>
                    {
                        recipes.map(recipe =>{
                            return(
                                <li>
                                    {recipe.name}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    )
  };
  
export default DisplayRecipeNames;