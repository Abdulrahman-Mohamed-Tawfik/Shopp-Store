import ProductModel from "../Models/Product.model.js";
import fs from "fs";
import path from "path";

const createProduct = async (req, res) => {
    try {
        req.body.imageURL = req.file.filename;
        const product = await ProductModel.create(req.body);
        res.status(201).json(product);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find().populate('category');
        res.status(200).json(products);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getProductsByCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const products = await ProductModel.find({ category: categoryId });
        res.status(200).json(products);
    }
    catch (err) {
        res.status(500).json({ error: err.message }); // Handle errors
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id).populate('category');
        res.status(200).json(product);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const deleteProductById = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const imagePath = path.join('./imgs', product.imageURL);

        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error("Error deleting image:", err);
                return res.status(500).json({ error: "Error deleting image from storage" });
            }
        });

        await ProductModel.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Product and image deleted successfully" });
    } catch (err) {
        console.error("Error deleting product:", err);
        res.status(500).json({ error: err.message });
    }
};



export default {
    createProduct,
    getAllProducts,
    getProductsByCategory,
    getProductById,
    deleteProductById,
};