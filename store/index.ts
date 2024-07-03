import { configureStore } from "@reduxjs/toolkit";

import createSagaMiddleware from "redux-saga";
import { userSlice } from "./userReducer/userReducer";
import { userCartSlice } from "./userReducer/userCartReducer";

import rootSaga from '../saga'


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        userCart: userCartSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>; 
