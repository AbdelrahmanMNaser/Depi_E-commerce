import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import categoriesReducer from './slices/categoriesSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoriesReducer,
  },
});

export default store;
