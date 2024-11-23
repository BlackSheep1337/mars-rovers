import { Router } from 'express';
import { getRoverHistory, processCommands } from './controllers/roverController';
import { authMiddleware } from './middleware/authMiddleware';
import { registerUser } from './controllers/registerController';
import { loginUser } from './controllers/loginController';

const router = Router();

router.get('/history', authMiddleware, getRoverHistory);
router.post('/commands', authMiddleware, processCommands);

router.post('/login', loginUser);
router.post('/register', registerUser);

export default router;