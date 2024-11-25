import { Router } from 'express';
import { processCommands } from './controllers/processCommandsController';
import { getRoverHistory } from './controllers/getHistoryController';
import { authMiddleware } from './middleware/authMiddleware';
import { registerUser } from './controllers/registerController';
import { loginUser } from './controllers/loginController';
import { deleteRoverHistory } from './controllers/deleteRoverHistory';

const router = Router();

router.get('/history', authMiddleware, getRoverHistory);
router.post('/commands', authMiddleware, processCommands);
router.delete('/history/delete', authMiddleware, deleteRoverHistory);

router.post('/login', loginUser);
router.post('/register', registerUser);

export default router;