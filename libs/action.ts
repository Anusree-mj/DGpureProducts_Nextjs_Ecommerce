'use server';

import Product from "@/models/productsModels";
import { connectToMongoDB } from "./connectDB";
import Cart from "@/models/cartModels";

export const addProductToCart = async (data: any) => {
    await connectToMongoDB();
    const { userId, productId, count } = data;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return { message: 'Product not found' };
        }

        const productTotal = product.price * count;

        let cart = await Cart.findOne({ userId });
        if (cart) {
            const productIndex = cart.products.findIndex((item) => item.productId.toString() === productId);
            if (productIndex > -1) {
                cart.products[productIndex].count += count;
            } else {
                cart.products.push({ productId, count });
            }
            cart.totalAmount += productTotal;
            await cart.save();
        } else {
            cart = await Cart.create({
                userId,
                products: [{ productId, count }],
                totalAmount: productTotal
            });
            await cart.save();
        }
        return { message: 'Product added to cart successfully', cart };
    } catch (error) {
        console.log(error);
        return { message: 'error creating cart' };
    }
}