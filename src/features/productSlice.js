import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  // InitialsState
  name: "Products",
  initialState: {
    Products: [],
  },

  //   Reducers
  reducers: {
    allProducts: (state, action) => {
      state.Products = action.payload;
    },
  },
});

export const { allProducts } = productSlice.actions;

// Use selectors is used to select the state so that you can use it any components, state. (the name of the reducer in your store). the actual state
export const selectProducts = (state) => state.products.Products;

export default productSlice.reducer;
