import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/ProductSlice";
import categoriesReducer from "./slices/CategoriesSlice";
import cartReducer from "./slices/CartSlice";
const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoriesReducer,
    cart: cartReducer,
  },
});

export default store;
