import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || { productList: [] },
  productDetails: [],
  status: "idle",
  error: null,
};

export const createCart = createAsyncThunk(
  "cart/createCart",
  async (cartData) => {
    try {
      localStorage.setItem("cart", JSON.stringify(cartData));
      return cartData;
    } catch (error) {
      throw Error("Failed to create cart");
    }
  }
);

export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async (productData) => {
    try {
      const cartData = JSON.parse(localStorage.getItem("cart")) || {
        productList: [],
      };
      const productExists = cartData.productList.some(
        (product) => product.productId === productData.productId
      );

      if (productExists) {
        throw Error("Product already in cart");
      }

      cartData.productList.push(productData);
      localStorage.setItem("cart", JSON.stringify(cartData));
      return cartData;
    } catch (error) {
      throw Error("Failed to add product to cart");
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

      if (productIndex === -1) throw Error("Product not found");

      cartData.productList[productIndex].quantity = quantity;
      localStorage.setItem("cart", JSON.stringify(cartData));
      return cartData;
    } catch (error) {
      throw Error("Failed to update product quantity");
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
      return cartData;
    } catch (error) {
      throw Error("Failed to remove product from cart");
    }
  }
);

export const setProductDetails = createAsyncThunk(
  "cart/setProductDetails",
  async (products) => {
    return products;
  }
);

export const deleteCart = createAsyncThunk("cart/deleteCart", async () => {
  try {
    localStorage.removeItem("cart");
    return null;
  } catch (error) {
    throw Error("Failed to delete cart");
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Cart
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
      // Add Product
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
      // Update Quantity
      .addCase(updateProductQuantity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductQuantity.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload;
      })
      .addCase(updateProductQuantity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Remove Product
      .addCase(removeProductFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload;
      })
      .addCase(removeProductFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Set Product Details
      .addCase(setProductDetails.fulfilled, (state, action) => {
        state.productDetails = action.payload;
      })
      // Delete Cart
      .addCase(deleteCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCart.fulfilled, (state) => {
        state.status = "succeeded";
        state.cart = null;
        state.productDetails = [];
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearError } = cartSlice.actions;
export default cartSlice.reducer;
