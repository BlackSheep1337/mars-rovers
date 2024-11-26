import { Router } from 'express';
import { loginUser } from './controllers/loginController';
import { registerUser } from './controllers/registerController';

const router = Router();

router.post('/login', loginUser);
router.post('/register', registerUser);

export default router;