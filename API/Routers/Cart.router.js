import express from "express";
import CartController from "../Controllers/Cart.controller.js";
import auth from "../Utilities/Authorization.js";

const router = express.Router();

router.get("/", auth.authMW, CartController.getAllCarts);
// router.get("/:id", CartController.getCartById);
router.get("/user/:userId", CartController.getCartByUserId);
router.post('/add', auth.authMW, CartController.addProductToCart);
router.post('/delete', auth.authMW, CartController.deleteProductFromCart);


export default router;