import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

const foundRecipes = await axios.get(`http://localhost:3000/api/recipes/get-all-recipes`)

export const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    value: foundRecipes.data.payload,
  },
  reducers: {
    setRecipes: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setRecipes } = recipesSlice.actions;

export default recipesSlice.reducer;