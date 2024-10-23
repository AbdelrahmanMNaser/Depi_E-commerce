import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/ProductSlice";
import categoriesReducer from "./slices/CategoriesSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoriesReducer,
  },
});

export default store;
