import { configureStore } from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // ✅ correct import
// Reducers
// Note: You can also use combineReducers from 'redux' if you prefer
import gameReducer from '../gameSlice.js';
import merchReducer from '../merchSlice.js';
import userReducer from '../userSlice.js';
import modalReducer from '../modalSlice.js';
import cartReducer from '../cartSlice.js';

//Combine reducers
// Note: You can also use combineReducers from 'redux' if you prefer
const rootReducer = combineReducers({
  game: gameReducer,
  merch: merchReducer,
  user: userReducer,
  modal: modalReducer,
  cart: cartReducer, //only cart needs to be persisted
});
 const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'user'], // Only persist the cart and user slices
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
