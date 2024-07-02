"use client";
import { Provider } from "react-redux";
import store from "@/store";
import ProductsComponent from "@/components/cartComponent";
import MainHeaderComponent from "@/components/mainHeader";


export default function Home() {
  return (
    <Provider store={store}>
      <MainHeaderComponent />
      <ProductsComponent />
    </Provider>
  );
}
