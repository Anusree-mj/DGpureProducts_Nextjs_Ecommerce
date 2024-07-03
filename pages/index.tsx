"use client";
import ProductsComponent from "@/components/productsComponent";
import MainHeaderComponent from "@/components/mainHeader";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {
  return (
  <>
    <ToastContainer />
    <MainHeaderComponent />
    <ProductsComponent />
  </>
  );
}
