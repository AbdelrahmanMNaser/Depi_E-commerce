import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from './../../axiosConfig';

const initialState = {
  cart: null,
  status: "idle", 
  error: null,
};

// Async thunks for API calls
export const createCart = createAsyncThunk(
  "cart/createCart",
  async (cartData) => {
    try {
      const response = await Axios.post("/cart", cartData);
      return response.data.cart; // Return the created cart
    } catch (error) {
      throw Error(error.response.data.message || "Failed to create cart"); // Throw error for handling in extraReducers
    }
  }
);

export const getCart = createAsyncThunk("cart/getCart", async (cartId) => {
  try {
    const response = await Axios.get(`/cart/${cartId}`);
    return response.data.cart;
  } catch (error) {
    throw Error(error.response.data.message || "Failed to get cart");
  }
});

export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async ({ cartId, productData }) => {
    try {
      const response = await Axios.post(`/cart/${cartId}/product`, productData);
      return response.data.cart;
    } catch (error) {
      throw Error(error.response.data.message || "Failed to add product");
    }
  }
);

export const updateProductInCart = createAsyncThunk(
  "cart/updateProductInCart",
  async ({ cartId, productData }) => {
    try {
      const response = await Axios.put(`/cart/${cartId}/product`, productData); // Assuming PUT for update
      return response.data.cart;
    } catch (error) {
      throw Error(error.response.data.message || "Failed to update product");
    }
  }
);

export const deleteProductFromCart = createAsyncThunk(
  "cart/deleteProductFromCart",
  async ({ cartId, productId }) => {
    try {
      const response = await Axios.delete(`/cart/${cartId}/product`, {
        data: { productID: productId }, // Sending productID in request body
      });
      return response.data.cart; // Or return just the message if the cart is deleted completely
    } catch (error) {
      throw Error(error.response.data.message || "Failed to delete product");
    }
  }
);

export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async (cartId) => {
    try {
      await Axios.delete(`/cart/${cartId}`);
      return cartId; // Return the deleted cart ID so we can update state
    } catch (error) {
      throw Error(error.response.data.message || "Failed to delete cart");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Any synchronous reducers you might need (e.g., clear cart)
    clearCart(state) {
      state.cart = null; // Reset the cart in the slice
      state.status = "idle"; // Reset the status and error
      state.error = null;
    },
  },
  extraReducers(builder) {
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
      })

      .addCase(getCart.pending, (state) => {
        state.status = "loading";
      })

      .addCase(getCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(addProductToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload;
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(updateProductInCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductInCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload;
      })
      .addCase(updateProductInCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(deleteProductFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProductFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload;
      })
      .addCase(deleteProductFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addMatcher(
        (action) =>
          /\/(getCart|addProductToCart|updateProductInCart|deleteProductFromCart)\.(pending|fulfilled|rejected)/,
        (state, action) => {
          if (action.type.endsWith("/pending")) {
            state.status = "loading";
          } else if (action.type.endsWith("/fulfilled")) {
            state.status = "succeeded";
            // Update the cart in the state:
            if (
              action.type.includes("deleteProductFromCart") &&
              action.payload === undefined
            ) {
              //if cart is empty don't update
            } else if (action.type.includes("deleteCart")) {
              // Handle deleteCart specifically
              state.cart = null; // Clear cart data from the state
            } else {
              state.cart = action.payload;
            }
          } else if (action.type.endsWith("/rejected")) {
            state.status = "failed";
            state.error = action.error.message;
          }
        }
      );
  },
});

export const { clearCart } = cartSlice.actions; // Export any synchronous actions
export default cartSlice.reducer;
