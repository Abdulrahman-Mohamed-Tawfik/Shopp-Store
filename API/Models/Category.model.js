import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        imageURL: { type: String }
    },
    { timestamps: true }
);

export default mongoose.model('Category', categorySchema);
