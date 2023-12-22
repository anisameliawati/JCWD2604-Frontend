/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    functionIncrementSlice: (state) => {
      state.value += 1;
    },
    functionDecrementSlice: (state) => {
      state.value -= 1;
    },
    functionincrementbyAmountSlice: (state, action) => {
      //   console.log(state, action);
      state.value += action.payload;
    },
  },
});

export const {
  functionIncrementSlice,
  functionDecrementSlice,
  functionincrementbyAmountSlice,
} = counterSlice.actions;

export default counterSlice.reducer;
