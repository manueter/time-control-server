"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.registerUser = void 0;
const userModel_1 = require("../models/userModel");
const hashUtils_1 = require("../utils/hashUtils");
const registerUser = async (req, res) => {
    ///{email: 'test@mail.com', password: 'test'} 
    const { email, username, password } = req.body;
    let exists = await (0, userModel_1.userExists)(email);
    if (exists) {
        res.status(400).json({ message: `User already registered` });
    }
    else {
        try {
            const hashedPassword = await (0, hashUtils_1.hashPassword)(password);
            let user_uuid = await (0, userModel_1.addUser)(email, username, hashedPassword);
            res
                .status(201)
                .json({
                message: `User ${user_uuid} registered successfully! Now, please add a profile.`,
            });
        }
        catch (error) {
            console.error('Error during register:', error);
            res
                .status(500)
                .json({ message: "An error occurred while registering the user." });
        }
    }
};
exports.registerUser = registerUser;
const getUsers = async (_req, res) => {
    // TODO
    //verify if admin.
    try {
        const usersData = await (0, userModel_1.getUsers)();
        res.status(200).json(usersData);
    }
    catch (error) {
        res.status(500)
            .json({ message: "An error occurred while fetching users." });
    }
};
exports.getUsers = getUsers;
