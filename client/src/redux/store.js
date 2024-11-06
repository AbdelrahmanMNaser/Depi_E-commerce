import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import productReducer from "./slices/ProductSlice";
import categoriesReducer from "./slices/CategoriesSlice";
import userReducer from "./slices/UserSlice";
import cartReducer from "./slices/CartSlice";
import reviewReducer from "./slices/ReviewSlice";
import orderReducer from "./slices/OrderSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    products: productReducer,
    categories: categoriesReducer,
    reviews: reviewReducer,
    orders: orderReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
