import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phoneNumber: { type: String, required: true, length: 11 },
        gender: { type: String, required: true },
        userType: { type: mongoose.Schema.Types.ObjectId, ref: 'UserType' },
        address: { type: String, required: true },
        favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
        cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
    },
    { timestamps: true }
);

export default mongoose.model('User', userSchema);
