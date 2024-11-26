import { Router } from 'express';
import { loginUser } from './controllers/loginUserController';
import { registerUser } from './controllers/registerUserController';

const router = Router();

router.post('/login', loginUser);
router.post('/register', registerUser);

export default router;