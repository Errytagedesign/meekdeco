import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  // InitialsState
  name: "product",
  initialState: {
    product: [],
    count: 0,
  },

  //   Reducers
  reducers: {
    allProducts: (state, action) => {
      state.product = action.payload;
    },

    increaMent: (state) => {
      state.count++;
    },
  },
});

export const { allProducts, increaMent } = productSlice.actions;

// Use selectors is used to select the state so that you can use it any components, state. (the name of the reducer in your store). the actual state
export const selectProducts = (state) => state.productSlice;

export default productSlice.reducer;
