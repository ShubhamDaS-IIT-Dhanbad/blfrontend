import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ pinCode, category, shopId }) => {
    try {
      const pincode = pinCode ? pinCode : [];
      const shopid = shopId ? shopId : "";
      const categories = Array.isArray(category) ? category : [category];
      const response = await fetch(`https://bharat-lbackend.vercel.app/api/v1/product/products?pincode=${pincode}&categories=${categories}&shopId=${shopid}`);
      console.log("ko",response)
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

// Async thunk to fetch product detail by id
export const fetchProductDetails = createAsyncThunk(
  'product/fetchProductDetails',
  async (productId) => {
    try {
      const response = await fetch(`https://bharat-lbackend.vercel.app/api/v1/product/productsdetail/${productId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }
      const productDetail = await response.json();
      return productDetail.product;
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk to search products
export const searchedProducts = createAsyncThunk(
  'products/searchedProducts',
  async (keywords) => {
    try {
      const response = await fetch(`https://bharat-lbackend.vercel.app/api/v1/product/products?keyword=${keywords}`);
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

// Initial state
const initialState = {
  products: [],
  filteredProducts: [],
  searchedProducts: [],
  productDetail: null,
  loading: false,
  error: null,
};

// Create product slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        action => action.type.startsWith('products/fetch') || action.type === 'products/searchedProducts',
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        action => action.type.endsWith('/fulfilled'),
        (state, action) => {
          state.loading = false;
          if (Array.isArray(action.payload)) {
            state.products = action.payload;
          } else {
            state.productDetail = action.payload;
          }
          state.error = null;
        }
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  }
});

// Extract action creators and reducer
export const { setFilteredProducts } = productSlice.actions;
export default productSlice.reducer;
