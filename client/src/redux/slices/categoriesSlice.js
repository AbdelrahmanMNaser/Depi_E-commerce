import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../axiosConfig";

// Initial state
const initialState = {
  categories: [],
  currentCategory: null,
  status: "idle",
  error: null,
};

// Async thunks
export const fetchAllCategories = createAsyncThunk(
  "categories/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get("/categories");
      return response.data; // returns the full list of categories
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCategoryById = createAsyncThunk(
  "categories/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`/categories/${id}`);
      return response.data; //  returns the category object
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createCategory = createAsyncThunk(
  "categories/create",
  async (category, { rejectWithValue }) => {
    try {
      const response = await Axios.post("/categories", category);
      return response.data; //returns the created category
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/update",
  async ({ id, category }, { rejectWithValue }) => {
    try {
      const response = await Axios.put(`/categories/${id}`, category);
      return response.data; // returns the updated category
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (id, { rejectWithValue }) => {
    try {
      await Axios.delete(`/categories/${id}`);
      return id; // Return the ID of the deleted category
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearCurrentCategory: (state) => {
      state.currentCategory = null; // Clear the current category
    },
  },
  extraReducers: (builder) => {
    // Fetch all categories
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload; // Store the fetched categories
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      
      // Fetch category by ID
      .addCase(fetchCategoryById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentCategory = action.payload; // Store the fetched category
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Create category
      .addCase(createCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories.push(action.payload); // Add the new category to the state
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Update category
      .addCase(updateCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.categories.findIndex(
          (category) => category.id === action.payload.id
        );
        if (index !== -1) {
          state.categories[index] = action.payload; // Update the category in the state
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Delete category
      .addCase(deleteCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload // Use ID for filtering
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearCurrentCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
