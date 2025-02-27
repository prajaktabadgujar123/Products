import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_API_URL;
const HEADERS = {
  "x-api-key": import.meta.env.VITE_API_KEY,
};

// Async thunk for fetching paginated products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page, searchQuery }, { rejectWithValue }) => {
    try {
      const url = searchQuery
        ? `https://stageapi.monkcommerce.app/task/products/search?search=${encodeURIComponent(
            searchQuery
          )}&limit=10`
        : `${API_URL}?page=${page}&limit=10`;

      const response = await fetch(url, { headers: HEADERS });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      return { products: data, page };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Product slice
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    page: 1,
    status: "idle",
    error: null,
    hasMore: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload.page === 1) {
          state.products = action.payload.products;
        } else {
          state.products = [...state.products, ...action.payload.products]; // Append on scroll
        }
        state.page = action.payload.page;
        state.hasMore = action.payload.products.length > 0;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
