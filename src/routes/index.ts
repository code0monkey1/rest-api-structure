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

router.post('/register', registerController.registerUser);

router.post('/login', loginController.loginUser);

router.post('/refresh', refreshTokenController.refresh);

router.get('/me', [auth], userController.me);

router.post('/logout', [auth], userController.logout);

// Products

router.post('/product', productController.create);

export default router;
