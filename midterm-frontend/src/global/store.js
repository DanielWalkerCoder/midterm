import { configureStore } from '@reduxjs/toolkit';
import weaponsReducer from './slices/weaponsSlice'
import treasuresReducer from './slices/treasuresSlice'

export const store = configureStore({
  reducer: {
    weapons: weaponsReducer,
    treasures: treasuresReducer
  },
});

export default store;