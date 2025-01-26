
import { Request, Response } from 'express';
import { addUser, userExists } from '../models/userModel';
import { hashPassword } from '../utils/hashUtils';


// Register a user without profile
  export const registerUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    let exists = await userExists(username);
    if(exists){
      res.status(400).json({ message: `User already registered` });     
    }else{

      try {    
        const hashedPassword = await hashPassword(password);
        let user_uuid = await addUser(username, hashedPassword);
        res.status(201).json({ message: `User ${user_uuid} registered successfully! Now, please add a profile.` });     
      } catch (error) {
        res.status(500).json({ message: 'An error occurred while registering the user.' });
      }
    }
    
  };