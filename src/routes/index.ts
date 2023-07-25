import express from 'express';
import { registerController } from '../../controllers';

const router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/register', registerController.registerUser);

export default router;
