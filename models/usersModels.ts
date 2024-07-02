import mongoose, { Document, Model } from "mongoose";

export interface IUser {
    name: string;
    phone: number;
    address: string;
}

export interface IUserDocument extends IUser, Document {
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUserDocument>(
    {
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const User: Model<IUserDocument> =
    mongoose.models?.User || mongoose.model("User", userSchema);

export default User;