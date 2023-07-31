/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import {
  loginController,
  registerController,
  userController,
} from '../controllers';
import auth from '../middlewares/auth';

const router = express.Router();

router.post('/register', registerController.registerUser);

router.post('/login', loginController.loginUser);

router.get('/me', auth, userController.me);

export default router;
