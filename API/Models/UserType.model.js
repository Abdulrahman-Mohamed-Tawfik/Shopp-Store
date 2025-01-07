import mongoose from "mongoose";

const userTypeSchema = mongoose.Schema(
    {
        typeName: { type: String, required: true, unique: true }, // e.g., "Customer", "Admin"
        description: { type: String } // e.g., "Customer", "Admin"
    },
    { timestamps: true }
);

export default mongoose.model('UserType', userTypeSchema);
