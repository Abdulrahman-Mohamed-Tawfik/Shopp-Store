import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        items: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
                quantity: { type: Number, required: true },
                size: { type: String },
                color: { type: String }
            }
        ]
    },
    { timestamps: true }
);

export default mongoose.model('Cart', cartSchema);
