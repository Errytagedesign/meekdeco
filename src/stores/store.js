import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import newUser from "@/features/loginSlice";
import productSlice from "@/features/productSlice";

const allReducers = combineReducers({
  newUser,
  productSlice,
});

// const masterReducer = (state, action) => {
//   if (action.type === HYDRATE) {
//     return {
//       ...state,
//       ...action.payload,
//     };
//   } else {
//     return allReducers(state, action);
//   }
// };

const configStore = () =>
  configureStore({
    reducer: allReducers,
  });

export const makeStore = () => {
  //  Check to confirm if we are on client side to persist, because we don't need to persist on server side
  const isServer = typeof window === "undefined";

  if (isServer) {
    return configStore();
  } else {
    // We need to persist on client side

    const persistConfig = {
      key: "nextjs",
      storage,
    };

    const persistedReducer = persistReducer(persistConfig, allReducers);

    let store = configureStore({
      reducer: persistedReducer,
    });

    store._persistor = persistStore(store);

    return store;
  }
};

export const wrapper = createWrapper(makeStore, { debug: true });
