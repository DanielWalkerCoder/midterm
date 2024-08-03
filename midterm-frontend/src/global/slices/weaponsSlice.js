import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

const foundWeapons = await axios.get(`http://localhost:3000/api/weapons/get-all-weapons`)

export const weaponsSlice = createSlice({
  name: 'weapons',
  initialState: {
    value: foundWeapons.data.payload,
  },
  reducers: {
    setWeapons: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setWeapons } = weaponsSlice.actions;

export default weaponsSlice.reducer;