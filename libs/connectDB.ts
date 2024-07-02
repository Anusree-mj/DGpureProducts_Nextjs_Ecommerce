import mongoose from "mongoose";

const connectMongoDB = async () => {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
        console.error("Error: MONGODB_URI is not defined in the environment variables");
        throw new Error("MONGODB_URI is not defined in the environment variables");
    }
    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected");
    } catch (err) {
        console.error("Error:", err);
    }
}

export default connectMongoDB;