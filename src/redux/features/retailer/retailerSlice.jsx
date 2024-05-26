import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch initial shop data
export const fetchShopData = createAsyncThunk(
  'retailer/fetchShopData',
  async (shopId, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://bharat-lbackend.vercel.app/api/v1/shop/shopdetail/${shopId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch shop data');
      }
      const shopData = await response.json();
      return shopData.shop;
    } catch (error) {
      throw error;
    }
  }
);

// Thunk to fetch products by shop ID
export const fetchProductsByShopId = createAsyncThunk(
  'retailer/fetchProductsByShopId',
  async (shopId, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://bshopbackend.vercel.app/api/v1/product/retailer/products/${shopId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const products = await response.json();
      return products.products;
    } catch (error) {
      throw error;
    }
  }
);

// Thunk to fetch retailer data from localStorage
export const fetchRetailerDataFromLocalStorage = createAsyncThunk(
  'retailer/fetchRetailerDataFromLocalStorage',
  async ({ dispatch }) => {
    try {
      const retailerData = JSON.parse(localStorage.getItem('retailerData'));
      if (!retailerData) {
        throw new Error('No retailer data found in localStorage');
      }
      dispatch(setRetailerData(retailerData));
      const shopId = retailerData.data.data.retailer.shop;
      if (shopId) {
        await dispatch(fetchShopData(shopId));
        await dispatch(fetchProductsByShopId(shopId));
      }
      return retailerData;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  retailerData: null,
  shopData: null,
  products: [],
  loading: false,
  error: null,
};

const retailerSlice = createSlice({
  name: 'retailer',
  initialState,
  reducers: {
    setRetailerData(state, action) {
      state.retailerData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShopData.fulfilled, (state, action) => {
        state.loading = false;
        state.shopData = action.payload;
      })
      .addCase(fetchShopData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductsByShopId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByShopId.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsByShopId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchRetailerDataFromLocalStorage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRetailerDataFromLocalStorage.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchRetailerDataFromLocalStorage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setRetailerData } = retailerSlice.actions;
export default retailerSlice.reducer;
