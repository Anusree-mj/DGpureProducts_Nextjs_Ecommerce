"use client";
import { Provider } from "react-redux";
import store from "@/store";
import ProductsComponent from "@/components/cartComponent";
import MainHeaderComponent from "@/components/mainHeader";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {
  return (
    <Provider store={store}>
      <ToastContainer />
        <MainHeaderComponent />
        <ProductsComponent />
    </Provider>
  );
}
