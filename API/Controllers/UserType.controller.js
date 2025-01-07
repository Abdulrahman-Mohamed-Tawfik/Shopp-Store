import UserTypeModel from "../Models/UserType.model.js";

const createUserType = async (req, res) => {
    try {

        if (!req.user) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        
        // Check if the user's role/type is admin
        const userTypeId = req.user.userTypeId;
        const userTypeObj = await UserTypeModel.findById(userTypeId);

        if (userTypeObj.typeName !== 'admin') {
            return res.status(403).json({ error: "Access denied. Only admins can perform this action" });
        }
        const userType = await UserTypeModel.create(req.body);
        res.status(201).json(userType);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getUserTypes = async (req, res) => {
    try {
        // Check if user is authenticated
        if (!req.user) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        // Check if the user's role/type is admin
        const userTypeId = req.user.userTypeId;
        const userType = await UserTypeModel.findById(userTypeId);

        if (!userType) {
            return res.status(404).json({ error: "User type not found" });
        }

        if (userType.typeName !== 'admin') {
            return res.status(403).json({ error: "Access denied. Only admins can perform this action" });
        }

        // If admin, fetch all user types
        const userTypes = await UserTypeModel.find();
        res.status(200).json(userTypes);
    } catch (err) {
        console.error("Error checking admin status:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteUserTypeById = async (req, res) => {
    try {
        const userType = await UserTypeModel.findById(req.params.id);

        console.log(userType);
        
        if (!userType) {
            return res.status(404).json({ message: "user type not found" });
        }

        await UserTypeModel.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "user type deleted successfully" });
    } catch (err) {
        console.error("Error deleting user type:", err);
        res.status(500).json({ error: err.message });
    }
};

export default {
    createUserType,
    getUserTypes,
    deleteUserTypeById,
};