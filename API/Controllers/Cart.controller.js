import CartModel from "../Models/Cart.model.js";
import ProductModel from '../Models/Product.model.js';
import UserTypeModel from "../Models/UserType.model.js";

const createCart = async (req, res) => {
    try {
        const Cart = await CartModel.create(req.body);
        res.status(201).json(Cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllCarts = async (req, res) => {
    try {
        // check if user exists [AUTHENTICATION]
        if (!req.user) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        // Check if the user's role/type is admin [AUTHORIZATION]
        const userTypeId = req.user.userTypeId;
        const userTypeObj = await UserTypeModel.findById(userTypeId);

        if (userTypeObj.typeName !== 'admin') {
            return res.status(403).json({ error: "Access denied. Only admins can perform this action" });
        }

        const Carts = await CartModel.find()
            .populate('user')
            .populate('items.product');
        res.status(200).json(Carts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// const getCartById = async (req, res) => {
//     try {
//         const Cart = await CartModel.findById(req.params.id)
//             .populate('user')
//             .populate('items.product'); // Corrected to `items.product`
//         if (!Cart) {
//             return res.status(404).json({ message: "Cart not found" });
//         }
//         res.status(200).json(Cart);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// Function to get cart by user ID
const getCartByUserId = async (req, res) => {
    try {
        const Cart = await CartModel.findOne({ user: req.params.userId })
            .populate('user')
            .populate('items.product');
        if (!Cart) {
            return res.status(404).json({ message: "Cart not found for this user" });
        }
        res.status(200).json(Cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const addProductToCart = async (req, res) => {
    const { userId, productId, quantity = 1 } = req.body;

    try {
        // Fetch the product details from the Product model
        const product = await ProductModel.findById(productId);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Find the user's cart
        let cart = await CartModel.findOne({ user: userId });

        // If no cart exists for the user, create a new one
        if (!cart) {
            cart = new CartModel({ user: userId, items: [] });
        }

        // Check if the product already exists in the cart
        const existingItemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId
        );

        if (existingItemIndex >= 0) {
            // If the product exists, update its quantity
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            // If the product does not exist, add the full product object along with quantity
            cart.items.push({ product: product, quantity });
        }

        // Save the updated cart
        await cart.save();

        res.status(200).json({ message: "Product added to cart", cart });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteProductFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;  // Take userId and productId from the request body

        // Find the user's cart
        const cart = await CartModel.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Find the product in the cart
        const productIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        // Remove the product from the cart
        cart.items.splice(productIndex, 1);

        // Save the updated cart
        await cart.save();

        res.status(200).json({ message: "Product deleted from cart successfully", cart });
    } catch (err) {
        console.error("Error deleting product:", err);
        res.status(500).json({ error: err.message });
    }
};



export default {
    createCart,
    getAllCarts,
    // getCartById,
    getCartByUserId,
    addProductToCart,
    deleteProductFromCart
};
