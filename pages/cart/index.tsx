"use client";
import MainHeaderComponent from "@/components/mainHeader";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartComponent from "@/components/cartComponent";


export default function Home() {
    return (
        <>
            <ToastContainer />
            <MainHeaderComponent />
            <CartComponent />
        </>

    );
}
