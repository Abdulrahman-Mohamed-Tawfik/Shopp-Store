import express from "express";
import userController from "../Controllers/User.controller.js";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.post("/login", userController.login);

export default router;