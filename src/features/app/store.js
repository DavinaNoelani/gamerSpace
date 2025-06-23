import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '../game/gameSlice'
import merchReducer from '../merch/merchSlice'
import userReducer from '../user/userSlice'
import modalReducer from '../modal/modalSlice'
import cartReducer from '../cart/cartSlice'


export const store = configureStore({
    reducer: {
        game: gameReducer,
        merch: merchReducer,
        user: userReducer,
        modal: modalReducer,
        cart: cartReducer
    }
})