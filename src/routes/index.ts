import express from 'express';
import { registerController } from '../../controllers';

const router = express.Router();

router.post('/register', registerController.registerUser);

export default router;
