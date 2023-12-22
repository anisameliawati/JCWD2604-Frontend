/** @format */

const initialState = {
  email: "",
  password: "",
};

export const userReducer = (state = initialState, action) => {
  if (action.type === "login") {
    // return { ...action.payload };
    const { email, password } = action.payload;
    return {
      email,
      password,
    };
  } else if (action.type === "logout") {
    return initialState;
  }
  return state;
};
