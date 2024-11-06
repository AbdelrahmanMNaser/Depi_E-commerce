import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../axiosConfig";

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await Axios.post("/orders", orderData);
      console.log("Response in server: " + JSON.stringify(response.data));

      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOrder = createAsyncThunk(
  "orders/fetchOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "orders/cancelOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await Axios.put(`/orders/${orderId}`);
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    order: null,
    status: "idle",

  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.order = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // Fetch Order By Id
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentOrder = action.payload;
      })

      .addCase(fetchOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
