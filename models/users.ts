import mongoose, { Schema, model, ObjectId } from "mongoose";

interface IUserProfile {
    userID: ObjectId;
    name: string;
    phone?: number;
    address?: string;
}

const userProfile = new Schema<IUserProfile>({
    userID: { type: mongoose.Types.ObjectId, required: true },
    name: { type: String, required: true },
    phone: { type: Number },
    address: { type: String, default: "" }
});

const user = model<IUserProfile>("user", userProfile);
export default user;
