import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// This function will be called when the thunk is dispatched
// It receives the thunkAPI as an argument, which contains methods like dispatch and getState


const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';
axios.defaults.baseURL = BASE_URL;
// If you need to set headers or other axios configurations, you can do it here
// For example, if you need to set a token for authentication, you can do it like this:
// axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;  
// If you need to set a timeout for requests, you can do it like this:
// axios.defaults.timeout = 10000; // 10 seconds
// If you need to set any other axios configurations, you can do it here
// For example, if you need to set a base URL for all requests, you can do it like this:
// axios.defaults.baseURL = 'https://api.example.com'; // Replace with your API base URL
// If you need to set any other axios configurations, you can do it here

const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
  delete axios.defaults.headers.common['Authorization'];
}

export const syncCartWithServer = createAsyncThunk(
  'cart/sync',


  async (cartItems, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().auth.user._id;
      const response = await axios.post('/api/cart', {
        userId,
        items: cartItems,
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isError: false,
  isSuccess: false,
  isLoading: true,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    resetCart:() => initialState,
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    addToCart: (state, { payload }) => {
      const existing = state.cartItems.find(item => item.id === payload.id);
      if (existing) {
        existing.amount += payload.amount || 1;
      } else {
        state.cartItems.push({
          ...payload,
          amount: payload.amount || 1,
        });
      }
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      if (cartItem) {
        cartItem.amount += 1;
      }
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      if (cartItem && cartItem.amount > 1) {
        cartItem.amount -= 1;
      } else {
        state.cartItems = state.cartItems.filter((item) => item.id !== payload.id);
      }
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },

});

console.log(cartSlice);

export const { clearCart, removeItem, increase, decrease, calculateTotals, addToCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;