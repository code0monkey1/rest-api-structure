/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import { loginController, registerController } from '../../controllers';

const router = express.Router();

router.post('/register', registerController.registerUser);

router.post('/login', loginController.loginUser);

export default router;
