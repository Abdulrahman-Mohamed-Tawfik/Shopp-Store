import express from "express";
import userTypeController from "../Controllers/UserType.controller.js";
import auth from "../Utilities/Authorization.js";

const router = express.Router();

router.get("/", auth.authMW, userTypeController.getUserTypes);
router.post("/", auth.authMW, userTypeController.createUserType);
router.delete("/:id", auth.authMW, userTypeController.deleteUserTypeById);

export default router;