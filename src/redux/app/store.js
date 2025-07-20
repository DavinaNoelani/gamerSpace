import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // ✅ correct import
// Reducers
// Note: You can also use combineReducers from 'redux' if you prefer
import gameReducer from '../game/gameSlice.js';
import merchReducer from '../merch/merchSlice';
import userReducer from '../../redux/user/userSlice';
import modalReducer from '../../redux/modal/modalSlice';
import cartReducer from '../cart/cartSlice'; // ❌ no need to import actions like addToCart here

// Persist config
const persistConfig = {
  key: 'cart',
  storage,
};


//Combine reducers
// Note: You can also use combineReducers from 'redux' if you prefer
const combineReducers = {
  game: gameReducer,
  merch: merchReducer,
  user: userReducer,
  modal: modalReducer,
  cart: persistReducer(persistConfig, cartReducer), // ✅ wrapped only cart
};

export const store = configureStore({
  reducer: combineReducers,
});

export const persistor = persistStore(store);