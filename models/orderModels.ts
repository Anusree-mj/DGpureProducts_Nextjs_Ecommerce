import mongoose, { Document, Model, ObjectId } from "mongoose";

export interface IOrder {
    userId: ObjectId;
    products: [{
        productId: ObjectId,
        count: number,
        amount: number
    }];
    totalAmount: number,
    orderStatus: string
}

export interface IOrderDocument extends IOrder, Document {
    createdAt: Date;
    updatedAt: Date;
}

const orderSchema = new mongoose.Schema<IOrderDocument>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        products: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
            count: {
                type: Number,
                default: 1,
            },
            amount: {
                type: Number,
                required: true
            }
        }],
        totalAmount: {
            type: Number,
            required: true
        },
        orderStatus: {
            type: String,
            default: 'placed'
        }
    },
    {
        timestamps: true,
    }
);

const Order: Model<IOrderDocument> =
    mongoose.models?.Order || mongoose.model("Order", orderSchema);

export default Order;