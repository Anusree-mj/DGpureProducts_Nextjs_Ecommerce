import Razorpay from 'razorpay';
import crypto from 'crypto';

const instance = new Razorpay({
    key_id: 'rzp_test_mj8FaMjD2VYPW4',
    key_secret: process.env.RAZORPAY_SECRET as string
});

interface RazorpayOrderResponse {
    id: string;
    entity: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: string;
    receipt: string;
    offer_id: string | null;
    status: string;
    attempts: number;
    notes: object;
    created_at: number;
}

interface PaymentDetails {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}

const createRazorpayOrder = async (orderId: string, total: number): Promise<RazorpayOrderResponse> => {
    const options = {
        amount: total * 100,  
        currency: "INR",
        receipt: "" + orderId
    };

    try {
        const order = await instance.orders.create(options);
        return order as RazorpayOrderResponse;
    } catch (error) {
        throw error;
    }
}

const verifyPayment = (payment: PaymentDetails): { status: 'ok' | 'nok' } => {
    const secret = process.env.RAZORPAY_SECRET as string;
    const orderId = payment.razorpay_order_id;
    const paymentId = payment.razorpay_payment_id;
    const razorpaySignature = payment.razorpay_signature;

    const generatedSignature = crypto.createHmac('sha256', secret)
        .update(orderId + "|" + paymentId)
        .digest('hex');

    if (generatedSignature === razorpaySignature) {
        return { status: 'ok' };
    } else {
        return { status: 'nok' };
    }
}

export {
    createRazorpayOrder,
    verifyPayment
}