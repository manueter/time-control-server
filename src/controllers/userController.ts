import { Request, Response } from "express";
import {
  addUser,
  userExists,
  getUsers as getUsersModel,
} from "../models/userModel";
import { hashPassword } from "../utils/hashUtils";

export const registerUser = async (req: Request, res: Response) => {

  ///{email: 'test@mail.com', password: 'test'} 
  const { email, username, password } = req.body;
  let exists = await userExists(email);
  if (exists) {
    res.status(400).json({ message: `User already registered` });
  } else {
    try {
      const hashedPassword = await hashPassword(password);
      let user_uuid = await addUser(email, username, hashedPassword);
      res
        .status(201)
        .json({
          message: `User ${user_uuid} registered successfully! Now, please add a profile.`,
        });
    } catch (error) {
      
      console.error('Error during register:', error);
      res
        .status(500)
        .json({ message: "An error occurred while registering the user." });
    }
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  // TODO
  //verify if admin.
  try {
    const usersData = await getUsersModel();
    res.status(200).json(usersData);
  } catch (error) {
    res.status(500)
      .json({ message: "An error occurred while fetching users." });
  }
};
