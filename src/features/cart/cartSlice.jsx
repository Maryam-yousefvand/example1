
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import './../../../node_modules/react-toastify/dist/ReactToastify.css'


const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQantity: [],
    cartTotalAmount: 0,

}


export const cartSlice = createSlice({
    name: "cart",
    initialState,

    reducers: {
        addToCart(state, action) {
            state.cartItems = JSON.parse(localStorage.getItem("cartItems"))
            const itemIndex = state.cartItems.findIndex((item) => item._id === action.payload._id)
            if (itemIndex >= 0) {

                state.cartItems[itemIndex].cartQuantity += 1



                toast.info(`increased ${state.cartItems[itemIndex].name} cart quanitity`, {
                    position: "bottom-right",

                })
            } else {
                let tepmProduct = { ...action.payload, cartQuantity: 1 }
                state.cartItems.push(tepmProduct)
                toast.success(`${action.payload.name} added to cart`, {
                    position: "top-right"
                })
                // state.cartItems.push(action.payload)

            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))


        },

        removeFromCart(state, action) {

            const nextCartItems = state.cartItems.filter(cartItem =>
                cartItem._id !== action.payload._id
            )

            state.cartItems = nextCartItems
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))

            toast.error(`${action.payload.name} removed from cart`, {
                position: "top-right"
            })

        },

        decreaseCart(state, action) {

            const itemIndex = state.cartItems.findIndex(cartItem => cartItem._id === action.payload._id)

            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1


            } else if (state.cartItems[itemIndex].cartQuantity === 1) {

                const nextCartItems = state.cartItems.filter(item => item._id !== action.payload._id)
                state.cartItems = nextCartItems
                toast.error(`${action.payload.name} removed from cart`)
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))



        },


        incrementCart(state, action) {

            const itemIndex = state.cartItems.findIndex(cartItem => cartItem._id === action.payload._id)

            if (state.cartItems[itemIndex].cartQuantity >= 1) {
                state.cartItems[itemIndex].cartQuantity += 1


            } else if (state.cartItems[itemIndex].cartQuantity === 0) {

                let tepmProduct = { ...action.payload, cartQuantity: 1 }
                state.cartItems.push(tepmProduct)
                toast.success(`${action.payload.name} added to cart`, {
                    position: "top-right"
                })
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))



        },


        // incrementCart(state, action) {
        //     const itemIndex = state.cartItems.findIndex(cartItem => cartItem.id === action.payload.id)
        //     state.cartItems[itemIndex].cartQuantity += 1

        //     localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        // },

        clearCart(state, action) {

            state.cartItems = []
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))

            toast.error("cart cleared", {
                position: "top-right"
            })

        },
        getTotals(state, action) {

            let { total, quantity } = state.cartItems.reduce((cartTotal, cartItem) => {
                const { price, cartQuantity } = cartItem
                const itemTotal = price * cartQuantity

                cartTotal.total += itemTotal
                cartTotal.quantity += cartQuantity

                return cartTotal
            },
                {
                    total: 0,
                    quantity: 0
                })

            state.cartTotalQantity = quantity
            state.cartTotalAmount = total


        }





    }


})


export const { addToCart, removeFromCart, decreaseCart, incrementCart, clearCart, getTotals } = cartSlice.actions
export const getAllProductsToCart = (state) => state.cart.cartItems
export const getCartTotalAmount = (state) => state.cart.cartTotalAmount
// export const nextCartItems = (state) => state.cart.removeFromCart
export default cartSlice.reducer





