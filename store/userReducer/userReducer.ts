import { createSlice } from "@reduxjs/toolkit";

import { UserItem, ProductItem } from "./type";

export interface userStateType {
    user: UserItem;
    totalCartItem: number;
    products: ProductItem[];
    isLoading: boolean;
    error: string;
}

const initialState: userStateType = {
    user: {
        _id: "",
        name: "",
        phone: 0,
        address: ""
    },
    totalCartItem: 0,
    products: [],
    isLoading: false,
    error: ''
}

export const userSlice: any = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        // get user details
        getUserDetailsAction: (state) => {
            console.log('entered in user action')
            state.isLoading = true;
        },
        getUserDetailsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.totalCartItem = action.payload.totalCartItem
            console.log('user details', state.user)
        },
        getUserDetailsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
        },

        // get product details
        getProductDetailsAction: (state) => {
            console.log('entered in user action')
            state.isLoading = true;
        },
        getProductDetailsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
            console.log('products details', state.products)
        },
        getProductDetailsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
        },

    }
})
export const {
    getUserDetailsAction,
    getUserDetailsSuccessAction,
    getUserDetailsFailureAction,

    getProductDetailsAction,
    getProductDetailsFailureAction,
    getProductDetailsSuccessAction,

} = userSlice.actions;