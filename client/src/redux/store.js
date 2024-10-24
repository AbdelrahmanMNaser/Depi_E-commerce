import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import productReducer from "./slices/ProductSlice";
import categoriesReducer from "./slices/CategoriesSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoriesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
