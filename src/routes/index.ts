/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import {
  loginController,
  productController,
  refreshTokenController,
  registerController,
  userController,
} from '../controllers';

import auth from '../middlewares/auth';

const router = express.Router();

//user

router.post('/register', registerController.registerUser);

router.post('/login', loginController.loginUser);

router.post('/refresh', refreshTokenController.refresh);

//auth

router.get('/me', [auth], userController.me);

router.post('/logout', [auth], userController.logout);

//products

router.post('/product', productController.create);

export default router;
