import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch shop details by ID
export const fetchShopDetails = createAsyncThunk(
  'shop/fetchShopDetails',
  async (shopId, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://bshopbackend-2r2jqqe6d-shubhamdas-iit-dhanbads-projects.vercel.app/shop/shopdetail/${shopId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch shop details');
      }
      
      const shopdetails = await response.json();
      return shopdetails.shop;
    } catch (error) {
      return rejectWithValue('Failed to fetch shop details');
    }
  }
);

// Async thunk to fetch shops by pin code and category
export const fetchShop = createAsyncThunk(
  'shop/fetchShop',
  async ({ pinCode, selectedCategories}, { rejectWithValue }) => {
    try {
      const url = `https://bshopbackend.vercel.app/api/v1/shop/shops?pincode=${pinCode}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch shops');
      }
      const shops = await response.json();
      return shops.shops;
    } catch (error) {
      return rejectWithValue('Failed to fetch shops');
    }
  }
);

// Create shop slice
const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    shops: [],
    shopDetails: null, // Changed to null from empty array
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShopDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.shopDetails = action.payload;
        state.error = null;
      })
      .addCase(fetchShopDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchShop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShop.fulfilled, (state, action) => {
        state.loading = false;
        state.shops = action.payload;
        state.error = null;
      })
      .addCase(fetchShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Extract action creators and reducer
export default shopSlice.reducer;
