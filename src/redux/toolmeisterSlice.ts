/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit/react";
import { ProductData } from "../../type";

interface UserInfo {
    id: string;
    name: string;
    email: string;
}

interface InitialState {
    cart: ProductData[];
    wishlist: ProductData[];
    userInfo: UserInfo | null;
}

const initialState: InitialState = {
    cart: [],
    wishlist: [],
    userInfo: null,
}

export const toolmeisterSlice = createSlice({
    name: 'toolmeister',
    initialState,
    reducers:{
        addToCart:(state, action) => {
            const existingProduct = state.cart.find(
                (item) => item._id === action.payload._id
            )
            if(existingProduct){
                existingProduct.quantity += 1
            } else {
                state.cart.push(action.payload)
            }
        },
        increaseQuantity:(state, action) => {
            const existingProduct = state.cart.find(
                (item) => item._id === action.payload
            )
            if(existingProduct){
                existingProduct.quantity += 1
            }
        },
        decreaseQuantity:(state, action) => {
            const existingProduct = state.cart.find(
                (item) => item._id === action.payload
            )
            if(existingProduct){
                existingProduct.quantity -= 1
            }
        },
        removeFromCart:(state, action) => {
            state.cart = state.cart.filter((item) => item._id !== action.payload)
        },
        resetCart:(state) => {
            state.cart = [];
        },
        addToWishlist:(state, action) => {
            const existingProduct = state.wishlist.find(
                (item) => item._id === action.payload._id
            )
                state.wishlist.push(action.payload)
        },
        resetWishlist:(state) => {
            state.wishlist = [];
        },
        addUser:(state, action) => {
            state.userInfo = action.payload
        },
        removeUser:(state) => {
            state.userInfo = null
        }
    }
})

export const { 
    addToCart, 
    increaseQuantity, 
    decreaseQuantity, 
    removeFromCart, 
    resetCart, 
    addToWishlist, 
    resetWishlist, 
    addUser,
    removeUser } = toolmeisterSlice.actions;
export default toolmeisterSlice.reducer;