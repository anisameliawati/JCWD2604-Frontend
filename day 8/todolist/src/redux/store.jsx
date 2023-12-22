/** @format */

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./reducers/counterReducer";
import counterSlice from "./slices/counterSlice";
import { userReducer } from "./reducers/userReducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  counter2: counterSlice,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// reducer merupakan state
// isi dari state ditentukan dari action type
// kumpulkan seluruh reducer yg dibuat ke dalam rootReducer dengan combine reducer
