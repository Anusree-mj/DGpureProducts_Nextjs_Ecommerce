import { createSlice } from "@reduxjs/toolkit";

import { CartItem } from "./type";

export interface userCartStateType {
    cartList: CartItem;
    isLoading: boolean;
    error: string;
}

const initialState: userCartStateType = {
    cartList: {
        _id: '',
        userId: "",
        products: [],
        totalAmount: 0
    },
    isLoading: false,
    error: ''
}

export const userCartSlice: any = createSlice({
    name: "userCart",
    initialState: initialState,
    reducers: {
        // add product to cart
        addProductToCartAction: (state) => {
            console.log('entered in user action')
            state.isLoading = true;
        },
        addProductToCartSuccessAction: (state) => {
            state.isLoading = false;
        },
        addProductToCartFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
        },

        // get cart product list
        getCartListAction: (state) => {
            console.log('entered in user action')
            state.isLoading = true;
        },
        getCartListSuccessAction: (state, action) => {
            state.isLoading = false;
            state.cartList = action.payload;
            console.log('cart items', state.cartList)
        },
        getCartListFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
        },
    }
})
export const {

    addProductToCartAction,
    addProductToCartFailureAction,
    addProductToCartSuccessAction,

    getCartListAction,
    getCartListFailureAction,
    getCartListSuccessAction

} = userCartSlice.actions;