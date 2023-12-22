/** @format */

import { decrement, increment } from "../constant";

const initState = {
  value: 0,
};

export function counterReducer(state = initState, action) {
  if (action.type == increment) {
    return { value: state.value + 1 };
  } else if (action.type == decrement) {
    return { value: state.value - 1 };
  } else if (action.type == "increment 5") {
    return { value: state.value + action.payload };
  }
  return state;
}
