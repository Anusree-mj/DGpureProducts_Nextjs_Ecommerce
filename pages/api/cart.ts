import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongoDB } from '@/libs/connectDB';
import Product from '@/models/productsModels';
import Cart from '@/models/cartModels';

const cartActions = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectToMongoDB();
    try {
        if (req.method === "POST") {
            const { userId, productId } = req.body;
            console.log('got userId:', userId, 'productId:', productId)
            const product = await Product.findById(productId);
            if (product) {
                let cart = await Cart.findOne({ userId });
                if (cart) {
                    const productIndex = cart.products.findIndex((item) => item.productId.toString() === productId);
                    if (productIndex > -1) {
                        cart.products[productIndex].count += 1;
                    } else {
                        cart.products.push({ productId, count: 1 });
                    }
                    cart.totalAmount += product.price;
                    await cart.save();
                } else {
                    cart = await Cart.create({
                        userId,
                        products: [{ productId, count: 1 }],
                        totalAmount: product.price
                    });
                    await cart.save();
                }
                res.status(200).json({ status: 'ok', cartList: cart });
            } else {
                res.status(404).json({ status: 'nok', message: 'Product not found' });

            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'nok', message: error });
    }
}

export default cartActions;