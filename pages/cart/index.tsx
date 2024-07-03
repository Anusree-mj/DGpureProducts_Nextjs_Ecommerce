"use client";
import { Provider } from "react-redux";
import store from "@/store";
import MainHeaderComponent from "@/components/mainHeader";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartComponent from "@/components/cartComponent";


export default function Home() {
    return (
        <Provider store={store}>
            <ToastContainer />
            <MainHeaderComponent />
            <CartComponent />
        </Provider>
    );
}
