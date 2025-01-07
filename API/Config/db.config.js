import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/storeDB");//mongodb://localhost:27017/
    console.log("Database Connected!");
}
export default connectDB;