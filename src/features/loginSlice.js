import { createSlice } from "@reduxjs/toolkit";

export const newUser = createSlice({
  // Pseudo code

  /*  create name and initial state and set value to current state you want, in this case: user = null, if it's to change values, then it will be: value = 0   */

  name: "user",
  initialState: {
    user: null,
  },

  /*  create reducer to accept payload or change value of the initial state, give each reducer an approriate name with two params; state and action   */
  reducers: {
    login: (state, action) => {
      // console.log(state);
      // action.payload means the result will get from server when user sign up
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

/*  export each actions as defined in the reducers  */
export const { login, logout } = newUser.actions;

// selectors
export const selectUsers = (state) => state.user.user;

/*  export reducers  */

export default newUser.reducer;
