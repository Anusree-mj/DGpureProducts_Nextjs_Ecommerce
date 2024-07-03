import { createSlice } from "@reduxjs/toolkit";

import { CartItem, OrderItem } from "./type";

export interface userCartStateType {
    cartList: CartItem;
    orderDetails: OrderItem;
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
    error: '',
    orderDetails: {
        _id: "",
        userId: "",
        products: [],
        totalAmount: 0,
        orderStatus: ""
    }
}

export const userCartSlice: any = createSlice({
    name: "userCart",
    initialState: initialState,
    reducers: {
        // add product to cart
        addProductToCartAction: (state) => {
            state.isLoading = true;
        },
        addProductToCartSuccessAction: (state) => {
            state.isLoading = false;
        },
        addProductToCartFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // get cart product list
        getCartListAction: (state) => {
            state.isLoading = true;
        },
        getCartListSuccessAction: (state, action) => {
            state.isLoading = false;
            state.cartList = action.payload;
        },
        getCartListFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // save order details
        saveOrderDetails: (state, action) => {
            state.orderDetails = action.payload;
        },
    }
})
export const {

    addProductToCartAction,
    addProductToCartFailureAction,
    addProductToCartSuccessAction,

    getCartListAction,
    getCartListFailureAction,
    getCartListSuccessAction,
    saveOrderDetails,

} = userCartSlice.actions;