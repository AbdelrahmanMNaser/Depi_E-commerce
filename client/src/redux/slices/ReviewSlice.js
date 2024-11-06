import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../axiosConfig";

// Initial state
const initialState = {
  reviews: [],
  selectedReveiw: null,
  status: "idle",
  error: null,
};

// Async thunks for CRUD operations
export const fetchAllReviews = createAsyncThunk(
  "reviews/fetchAllReviews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`/reviews/`);
      return response.data.reviews;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchReviewsByProduct = createAsyncThunk(
  "reviews/fetchReviewsByProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`/reviews/products/${productId}`);
      return response.data.reviews;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchReview = createAsyncThunk(
  "reviews/fetchReview",
  async (reviewId, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createReview = createAsyncThunk(
  "reviews/createReview",
  async (newReview, { rejectWithValue }) => {
    try {
      const response = await Axios.post("/reviews", newReview);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async ({ reviewId, updatedReview }, { rejectWithValue }) => {
    try {
      const response = await Axios.put(`/reviews/${reviewId}`, updatedReview);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (reviewId, { rejectWithValue }) => {
    try {
      await Axios.delete(`/reviews/${reviewId}`);
      return reviewId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    selectReview: (state, action) => {
      if (
        state.selectedReview &&
        state.selectedReview._id === action.payload._id
      ) {
        state.selectedReview = null; // Deselect if the same Review is clicked
      } else {
        state.selectedReview = action.payload; // Update selectedReview
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all Reviews
      .addCase(fetchAllReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllReviews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews = action.payload;
      })
      .addCase(fetchAllReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Fetch Reviews by Product
      .addCase(fetchReviewsByProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReviewsByProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsByProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Fetch review by ID
      .addCase(fetchReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReview.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.review = action.payload;
      })
      .addCase(fetchReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Create review
      .addCase(createReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews.push(action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Update category
      .addCase(updateReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.reviews.findIndex(
          (review) => review.id === action.payload.id
        );
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Delete category
      .addCase(deleteReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.review = state.reviews.filter(
          (review) => review.id !== action.payload
        );
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { selectReview } = reviewSlice.actions; // Export the action

export default reviewSlice.reducer;
