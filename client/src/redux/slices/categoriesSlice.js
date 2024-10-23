import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../axiosConfig";

// Initial state
const initialState = {
  categories: [],
  selectedCategory: null,
  selectedSubCategory: null,
  status: "idle",
  error: null,
};

// Async thunks for CRUD operations
export const fetchAllCategories = createAsyncThunk(
  "categories/fetchAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get("/categories");
      return response.data.categories;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCategory = createAsyncThunk(
  "categories/fetchCategory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`/categories/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (newCategory, { rejectWithValue }) => {
    try {
      const response = await Axios.post("/categories", newCategory);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, updatedCategory }, { rejectWithValue }) => {
    try {
      const response = await Axios.put(`/categories/${id}`, updatedCategory);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      await Axios.delete(`/categories/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    selectCategory: (state, action) => {
      if (
        state.selectedCategory &&
        state.selectedCategory._id === action.payload._id
      ) {
        state.selectedCategory = null; // Deselect if the same category is clicked
      } else {
        state.selectedCategory = action.payload; // Update selectedCategory
      }
    },
    selectSubCategory: (state, action) => {
      if (
        state.selectedSubCategory &&
        state.selectedSubCategory._id === action.payload._id
      ) {
        state.selectedSubCategory = null; // Deselect if the same subcategory is clicked
      } else {
        state.selectedSubCategory = action.payload; // Update selectedSubCategory
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all categories
      .addCase(fetchAllCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Fetch category by ID
      .addCase(fetchCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.category = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Create category
      .addCase(createCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories.push(action.payload);
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
          state.categories[index] = action.payload;
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
          (category) => category.id !== action.payload
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { selectCategory } = categorySlice.actions; // Export the action
export const { selectSubCategory } = categorySlice.actions; // Export the action

export default categorySlice.reducer;
