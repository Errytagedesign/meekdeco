import { configureStore } from "@reduxjs/toolkit";

import newUser from "@/features/loginSlice";
import productSlice from "@/features/productSlice";
const store = configureStore({
  reducer: {
    user: newUser,
    products: productSlice,
  },
});

export default store;
