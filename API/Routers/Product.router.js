import express from "express";
import ProductController from "../Controllers/Product.controller.js";
import upload from "../Utilities/multerConfig.js";

const router = express.Router();

router.get("/", ProductController.getAllProducts);
router.get('/category/:categoryId', ProductController.getProductsByCategory);
router.get("/:id", ProductController.getProductById);
router.post("/", upload.single('productImage'), ProductController.createProduct);
router.delete("/:id", ProductController.deleteProductById);

export default router;