import { createSlice } from '@reduxjs/toolkit';

// Best for: Modals that must be controlled from anywhere in the app, like notifications, confirmations, or shared dialogs.

const initialState = { isOpen: false };

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: state => { state.isOpen = true; },
    close: state => { state.isOpen = false; },
    toggle: state => { state.isOpen = !state.isOpen; }
  },
});

export const { open, close, toggle } = modalSlice.actions;
export default modalSlice.reducer;