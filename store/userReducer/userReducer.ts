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
            state.isLoading = true;
        },
        getUserDetailsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.totalCartItem = action.payload.totalCartItem
        },
        getUserDetailsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // get product details
        getProductDetailsAction: (state) => {
            state.isLoading = true;
        },
        getProductDetailsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
        },
        getProductDetailsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
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