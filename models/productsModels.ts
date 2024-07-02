import mongoose, { Document, Model } from "mongoose";

export interface IProduct {
    name: string;
    image: string;
    price: number;
}

export interface IProductDocument extends IProduct, Document {
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new mongoose.Schema<IProductDocument>(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Product: Model<IProductDocument> =
    mongoose.models?.Product || mongoose.model("Product", productSchema);

export default Product;