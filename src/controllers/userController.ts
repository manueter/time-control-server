
import { Request, Response } from 'express';
import { addUser, userExists } from '../models/userModel';
import { hashPassword, comparePassword } from '../utils/hashUtils';


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

// Add profile after user registration
// export const addUserProfile = async (req: Request, res: Response) => {
//   try {
//     const { user_uuid, workSchedule } = req.body;

//     // Add profile for the user
//     await addProfile(user_uuid, workSchedule);

//     res.status(201).json({ message: 'Profile added successfully!' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'An error occurred while adding the profile.' });
//   }
// };

// // Login user
// export const loginUser = async (req: Request, res: Response) => {
//   const { username, password } = req.body;

//   try {
//     // Retrieve the user data (mocked from your models)
//     const usersData = await getUsers();
//     const user = usersData.users.find((user) => user.username === username);

//     if (!user) {
//       return res.status(400).json({ message: 'Invalid username or password.' });
//     }

//     // Compare password with the stored hashed password
//     const isPasswordValid = await comparePassword(password, user.password);

//     if (!isPasswordValid) {
//       return res.status(400).json({ message: 'Invalid username or password.' });
//     }

//     // Generate a JWT token
//     const token = jwt.sign({ user_uuid: user.uuid }, SECRET_KEY, { expiresIn: '1h' });

//     // Return the JWT token to the user
//     res.status(200).json({
//       message: 'Login successful!',
//       token, // Send the JWT token to the client
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'An error occurred during login.' });
//   }
// };
