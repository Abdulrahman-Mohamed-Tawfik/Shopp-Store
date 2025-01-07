import CategoryModel from "../Models/Category.model.js";

const createCategory = async (req, res) => {
    try {
        req.body.imageURL = req.file.filename;
        const category = await CategoryModel.create(req.body);
        res.status(201).json(category);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        res.status(200).json(categories);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getCategoryById = async (req, res) => {
    try {
        const category = await CategoryModel.findById(req.params.id);
        res.status(200).json(category);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export default {
    createCategory,
    getAllCategories,
    getCategoryById
};