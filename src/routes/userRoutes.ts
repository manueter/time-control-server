import express from 'express';
import { registerUser, getUsers } from '../controllers/userController';

const router = express.Router();

//router.get('/', getUsers);
router.post('/register', registerUser);

export default router;
