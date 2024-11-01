import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || null,
  status: "idle", 
  error: null,
};

// Async thunks for local storage operations
export const createCart = createAsyncThunk(
  "cart/createCart",
  async (cartData) => {
    try {
      // Store the cart data in local storage
      localStorage.setItem("cart", JSON.stringify(cartData));
      return cartData; // Return the created cart
    } catch (error) {
      throw Error("Failed to create cart"); // Throw error for handling in extraReducers
    }
  }
);

export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async (productData) => {
    try {
      const cartData = JSON.parse(localStorage.getItem("cart"));
      cartData.productList.push(productData);
      localStorage.setItem("cart", JSON.stringify(cartData));
      return cartData; // Return the updated cart
    } catch (error) {
      throw Error("Failed to add product to cart"); // Throw error for handling in extraReducers
    }
  }
);

export const updateProductQuantity = createAsyncThunk(
  "cart/updateProductQuantity",
  async ({ productId, quantity }) => {
    try {
      const cartData = JSON.parse(localStorage.getItem("cart"));
      const productIndex = cartData.productList.findIndex(
        (product) => product.productId === productId
      );
      cartData.productList[productIndex].quantity = quantity;
      localStorage.setItem("cart", JSON.stringify(cartData));
      return cartData; // Return the updated cart
    } catch (error) {
      throw Error("Failed to update product quantity"); // Throw error for handling in extraReducers
    }
  }
);

export const removeProductFromCart = createAsyncThunk(
  "cart/removeProductFromCart",
  async (productId) => {
    try {
      const cartData = JSON.parse(localStorage.getItem("cart"));
      cartData.productList = cartData.productList.filter(
        (product) => product.productId !== productId
      );
      localStorage.setItem("cart", JSON.stringify(cartData));
      return cartData; // Return the updated cart
    } catch (error) {
      throw Error("Failed to remove product from cart"); // Throw error for handling in extraReducers
    }
  }
);

export const deleteCart = createAsyncThunk("cart/deleteCart", async () => {
  try {
    localStorage.removeItem("cart");
    return null; 
  } catch (error) {
    throw Error("Failed to delete cart"); // Throw error for handling in extraReducers
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Define your reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload;
      })
      .addCase(createCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;