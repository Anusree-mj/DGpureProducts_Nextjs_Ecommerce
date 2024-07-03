import { takeEvery, put, call } from 'redux-saga/effects';
import {
    addProductToCartAction, addProductToCartFailureAction, addProductToCartSuccessAction,
    getCartListAction, getCartListFailureAction, getCartListSuccessAction,
} from '@/store/userReducer/userCartReducer';
import { apiCall } from '@/services/api';
import { CartItem } from '@/store/userReducer/type';

// add product to cart
function* addProductToCartActionSaga(action: {
    type: string;
    payload: {
        userId: '', productId: '', handleAddToCartSuccess: () => void
    }
}): any {
    try {
        const response = yield call<any>(apiCall, {
            method: 'POST',
            endpoint: 'cart',
            body: action.payload
        });

        if (response.status === 'ok') {
            yield put(addProductToCartSuccessAction())
            action.payload.handleAddToCartSuccess();
        } else {
            yield put(addProductToCartFailureAction(response.message))
        }
    } catch (err) {
        yield put(addProductToCartFailureAction(err))
    }
}

// get cartlist details
function* getCartListActionSaga(action: {
    type: string;
    payload: {
        handleCartListEmtyAction: (cartItems: CartItem) => void
    }
}): any {
    try {
        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: `cart`,
        });

        if (response.status === 'ok') {
            yield put(getCartListSuccessAction(response.cartList))
            action.payload.handleCartListEmtyAction(response.cartList)
        } else {
            yield put(getCartListFailureAction(response.message))
        }
    } catch (err) {
        yield put(getCartListFailureAction(err))
    }
}


export function* userCartWatcher() {
    yield takeEvery(addProductToCartAction, addProductToCartActionSaga);
    yield takeEvery(getCartListAction, getCartListActionSaga);

}