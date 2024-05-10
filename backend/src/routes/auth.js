import express from 'express'
import { loginUser } from '../controller/authController/loginUser.js';
import { createUser } from '../controller/authController/createUser.js';

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser)

export default router;
