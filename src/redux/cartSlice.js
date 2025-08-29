// src/features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // {productId, title, price, img, amount}
  totalItems: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existing = state.items.find(i => i.productId === item.productId);

      if (existing) {
        existing.amount += 1;
      } else {
        state.items.push({ ...item, amount: 1 });
      }

      state.totalItems += 1;
      state.totalPrice += item.price;
    },

    removeItem: (state, action) => {
      const id = action.payload;
      const existing = state.items.find(i => i.productId === id);

      if (!existing) return;

      state.totalItems -= existing.amount;
      state.totalPrice -= existing.price * existing.amount;
      state.items = state.items.filter(i => i.productId !== id);
    },

    decreaseItem: (state, action) => {
      const id = action.payload;
      const existing = state.items.find(i => i.productId === id);

      if (!existing) return;

      existing.amount -= 1;
      state.totalItems -= 1;
      state.totalPrice -= existing.price;

      if (existing.amount <= 0) {
        state.items = state.items.filter(i => i.productId !== id);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, decreaseItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
// Thunks for async actions (e.g., syncing with server) can be added here