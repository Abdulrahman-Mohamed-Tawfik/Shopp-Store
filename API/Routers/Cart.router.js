import express from "express";
import CartController from "../Controllers/Cart.controller.js";

const router = express.Router();

router.get("/", CartController.getAllCarts);
// router.get("/:id", CartController.getCartById);
router.get("/user/:userId", CartController.getCartByUserId);
router.post('/add', CartController.addProductToCart);
router.post('/delete', CartController.deleteProductFromCart);


export default router;