import { createSlice } from "@reduxjs/toolkit";

export const newUser = createSlice({
  name: "user",
  initialState: {
    value: 0,
  },
  reducers: {
    createUser: (state) => {
      state.value + 1;
    },
    updateUser: (state) => {
      state.value + 1;
    },
    deleteUser: (state) => {
      state.value + 1;
    },
  },
});
