import { configureStore } from '@reduxjs/toolkit';
import hitReducer from './slices/hitSlice';
import weaponsReducer from './slices/weaponsSlice'
import treasuresReducer from './slices/treasuresSlice'

export const store = configureStore({
  reducer: {
    hit: hitReducer,
    weapons: weaponsReducer,
    treasures: treasuresReducer
  },
});

export default store;