import express from "express";
import CategoryController from "../Controllers/Category.controller.js";
import upload from "../Utilities/multerConfig.js";

const router = express.Router();

router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getCategoryById);
router.post("/",upload.single('categoryImage'), CategoryController.createCategory);

export default router;