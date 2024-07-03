import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongoDB } from '@/libs/connectDB';
import Product from '@/models/productsModels';
import Cart from '@/models/cartModels';

const cartActions = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectToMongoDB();
    try {
        if (req.method === "POST") {
            const { userId, productId } = req.body;
            const product = await Product.findById(productId);
            if (product) {
                let cart = await Cart.findOne({ userId });
                if (cart) {
                    const productIndex = cart.products.findIndex((item) => item.productId.toString() === productId);
                    if (productIndex > -1) {
                        cart.products[productIndex].count += 1;
                        cart.products[productIndex].amount += product.price;
                    } else {
                        cart.products.push({ productId, count: 1, amount: product.price });
                    }
                    cart.totalAmount += product.price;
                    await cart.save();
                } else {
                    cart = await Cart.create({
                        userId,
                        products: [{ productId, count: 1, amount: product.price }],
                        totalAmount: product.price
                    });
                    await cart.save();
                }
                res.status(200).json({ status: 'ok' });
            } else {
                res.status(404).json({ status: 'nok', message: 'Product not found' });
            }
        }
        else if (req.method === 'GET') {
            // since only one user
            const userId = process.env.USERID;
            const cartItem = await Cart.findOne({ userId: userId }).populate('products.productId', 'name image price');
            if (cartItem) {
                res.status(200).json({ status: 'ok', cartList: cartItem });
            } else {
                res.status(404).json({ status: 'nok', message: 'Cart is empty' });
            }
        }
        else if (req.method === 'PUT') {
            const { productId, cartId, count } = req.body;

            const cart = await Cart.findById(cartId);
            if (!cart) {
                return res.status(404).json({ status: 'nok', message: 'Cart not found' });
            }

            const productIndex = cart.products.findIndex((item) => item.productId.toString() === productId);
            if (productIndex === -1) {
                return res.status(404).json({ status: 'nok', message: 'Product not found in cart' });
            }

            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ status: 'nok', message: 'Product not found' });
            }

            cart.products[productIndex].count = count;
            cart.products[productIndex].amount = product.price * count;

            cart.totalAmount = cart.products.reduce((acc, item) => acc + item.amount, 0);
            await cart.save();
            res.status(200).json({ status: 'ok' });
        }
        else if (req.method === 'DELETE') {
            const { productId, cartId } = req.body;

            let cart = await Cart.findById(cartId);
            if (cart) {
                const productIndex = cart.products.findIndex((item) => item.productId.toString() === productId);
                if (productIndex > -1) {
                    const amountToRemove = cart.products[productIndex].amount;
                    cart.products.splice(productIndex, 1);
                    cart.totalAmount -= amountToRemove;

                    await cart.save();
                    res.status(200).json({ status: 'ok', cartList: cart });
                } else {
                    res.status(404).json({ status: 'nok', message: 'Product not found in cart' });
                }
            } else {
                res.status(404).json({ status: 'nok', message: 'Cart not found' });
            }
        } else {
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'nok', message: error });
    }
}

export default cartActions;