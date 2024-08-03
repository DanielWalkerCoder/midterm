import { createSlice } from '@reduxjs/toolkit';

export const hitSlice = createSlice({
  name: 'hit',
  initialState: {
    value: 0,
  },
  reducers: {
    increaseByThree: (state) => {
      state.value += 3;
    },
    setHit: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { increaseByThree, setHit } = hitSlice.actions;

export default hitSlice.reducer;