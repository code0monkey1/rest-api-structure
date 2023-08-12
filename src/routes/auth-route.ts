//Authentication routes
/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express';

import {
  loginController,
  refreshTokenController,
  registerController,
} from '../controllers';

const router = express.Router();

router.post('/register', registerController.registerUser);

router.post('/login', loginController.loginUser);

router.post('/refresh', refreshTokenController.refresh);

export default router;
