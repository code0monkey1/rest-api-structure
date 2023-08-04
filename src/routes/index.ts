/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

import {
  loginController,
  productController,
  refreshTokenController,
  registerController,
  userController,
} from '../controllers';

import { admin, auth } from '../middlewares';

const router = express.Router();

//user

router.post('/register', registerController.registerUser);

router.post('/login', loginController.loginUser);

router.post('/refresh', refreshTokenController.refresh);

//auth

router.get('/me', [auth], userController.me);

router.post('/logout', [auth], userController.logout);

//products

router.post('/products', [auth, admin], productController.create);
router.put('/products/:id', productController.update);

export default router;
