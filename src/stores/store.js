import { configureStore } from "@reduxjs/toolkit";

import newUser from "@/features/loginSlice";

const store = configureStore({
  reducer: {
    user: newUser,
  },
});

export default store;
