import { configureStore } from '@reduxjs/toolkit';
import weaponsReducer from './slices/weaponsSlice'
import treasuresReducer from './slices/treasuresSlice'
import recipesReducer from './slices/recipesSlice'

export const store = configureStore({
  reducer: {
    weapons: weaponsReducer,
    treasures: treasuresReducer,
    recipes: recipesReducer
  },
});

export default store;