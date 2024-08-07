"use client";
import { Provider } from "react-redux";
import store from "@/store";
import MainHeaderComponent from "@/components/mainHeader";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderSuccessComponent from "@/components/orderSuccessComponent";


export default function Home() {
    return (
        <>
            <ToastContainer />
            <MainHeaderComponent />
            <OrderSuccessComponent />
        </>
    );
}
