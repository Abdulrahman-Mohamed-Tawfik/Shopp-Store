import UserModel from "../Models/User.model.js";
import Hashing from "../Utilities/Hashing.js";
import auth from "../Utilities/Authorization.js";
import UserTypeModel from "../Models/UserType.model.js";
import CartModel from '../Models/Cart.model.js';

const createUser = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, gender, userType: userTypeParam, address } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(401).json({ error: 'Email is already registered' });
        }

        const hashedPassword = await Hashing.hashPassword(password);

        let userTypeId;
        if (userTypeParam) {
            userTypeId = userTypeParam;
        } else {
            const defaultUserType = await UserTypeModel.findOne({ typeName: 'user' });
            if (!defaultUserType) {
                return res.status(500).json({ error: 'Default user type (user) not found. Please initialize user types.' });
            }
            userTypeId = defaultUserType._id;
        }

        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            gender,
            address,
            userType: userTypeId 
        });

        // Create a cart for the user after successful user creation
        const cart = await CartModel.create({
            user: user._id, 
            items: [] 
        });

        res.status(201).json({ message: 'User and cart created successfully', user, cart });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
};



const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find().populate('userType');
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id).populate('userType').populate('cart');
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email }).populate('userType');
        if (user) {
            const isMatch = await Hashing.comparePass(password, user.password);
            if (isMatch) {
                //login logic here
                const token = auth.createToken({
                    userId: user._id,
                    username: user.name,
                    email: user.email,
                    password: user.password,
                    phoneNumber: user.phoneNumber,
                    gender: user.gender,
                    address: user.address,
                    userType: user.userType.typeName,
                    userTypeId: user.userType._id,
                    createDate: user.createdAt,
                });
                // console.log("token: ", token);

                res.status(200).json({ 'access token': token });
            }
            else {
                res.status(400).json({ 'not found': "wrong password" })
            }
        }
        else {
            res.status(400).json({ 'not found': "email not found" })
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export default {
    createUser,
    getAllUsers,
    getUserById,
    login,
}