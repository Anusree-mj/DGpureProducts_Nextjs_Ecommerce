import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongoDB } from '@/libs/connectDB';
import Order from '@/models/orderModels';
import Cart from '@/models/cartModels';
import { createRazorpayOrder, verifyPayment } from '@/libs/razorpay';

const checkoutActions = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectToMongoDB();
    try {
        if (req.method === "POST") {
            const { userId, totalAmount } = req.body;
            const cart = await Cart.findOne({ userId: userId });
            if (cart) {
                const order = new Order({
                    userId: userId,
                    products: cart.products,
                    totalAmount: totalAmount,
                    orderStatus: 'placed'
                })
                await order.save();

                const orderId = order.id.toString();
                const orderDetails = await createRazorpayOrder(orderId, totalAmount)
                res.status(200).json({ status: 'ok', order: orderDetails });
            } else {
                res.status(404).json({ status: 'nok', message: 'Cart not found' });
            }
        } else if (req.method === 'PUT') {
            const { payment, order, userId } = req.body;
            const { status } = verifyPayment(payment)
            if (status === 'ok') {
                await Cart.deleteOne({ userId: userId });
                await Order.updateOne({ _id: order.receipt }, { orderStatus: 'completed' })
                const orderDetails = await Order.findById(order.receipt)
                res.status(200).json({ status: 'ok', order: orderDetails });
            } else {
                res.status(404).json({ status: 'nok', message: 'Payment doesnt match' });
            }
        } else {
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 'nok', message: error });
    }
}

export default checkoutActions;