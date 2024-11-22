import { Router } from 'express';
import { getRoverHistory, processCommands } from './controllers/roverController';
import { authMiddleware } from './middleware/authMiddleware';
import { loginUser, registerUser } from './controllers/authController';

const router = Router();

router.get('/history', authMiddleware, getRoverHistory);
router.post('/commands', authMiddleware, processCommands);

router.post('/login', loginUser);
router.post('/register', registerUser);

export default router;