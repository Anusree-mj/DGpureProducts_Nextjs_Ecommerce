import mongoose, { Document, Model, ObjectId } from "mongoose";

export interface ICart {
    userId: ObjectId;
    products: [{
        productId: ObjectId,
        count: number,
        amount: number
    }];
    totalAmount: number
}

export interface ICartDocument extends ICart, Document {
    createdAt: Date;
    updatedAt: Date;
}

const cartSchema = new mongoose.Schema<ICartDocument>(
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
        }
    },
    {
        timestamps: true,
    }
);

const Cart: Model<ICartDocument> =
    mongoose.models?.Cart || mongoose.model("Cart", cartSchema);

export default Cart;