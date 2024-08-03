import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

const foundTreasures = await axios.get(`http://localhost:3000/api/treasures/get-all-treasures`)

export const treasuresSlice = createSlice({
  name: 'treasures',
  initialState: {
    value: foundTreasures.data.payload,
  },
  reducers: {
    setTreasures: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setTreasures } = treasuresSlice.actions;

export default treasuresSlice.reducer;