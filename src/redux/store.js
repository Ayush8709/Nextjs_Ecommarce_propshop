import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slice/productSlice";
import cartReducer from "./slice/cartSlice";
import userReducer from './slice/userSlice'

const store = configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer,
        user: userReducer
    }
})


export default store;