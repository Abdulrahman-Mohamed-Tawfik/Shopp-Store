import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
        price: { type: Number, required: true },
        sizes: [{ type: String }], // e.g., ["S", "M", "L"]
        colors: [{ type: String }], // e.g., ["Red", "Blue"]
        imageURL: { type: String }, // URL
        stock: { type: Number, required: true }, //available quantity
        isFeatured: { type: Boolean, default: false }
    },
    { timestamps: true }
);

export default mongoose.model('Product', productSchema);
