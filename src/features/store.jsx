
import { configureStore } from "@reduxjs/toolkit";
import productsReducer, { fetchAsyncProducts } from './products/productSlice'
import cartReducer from './cart/cartSlice'
import authReducer from './auth/authSlice'

// import { productSlice, getAllProducts } from './products/productSlice';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        auth: authReducer,

    }

})

// store.dispatch(fetchAsyncProducts())