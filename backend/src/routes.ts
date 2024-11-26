import { Router } from 'express';
import { processCommands } from './modules/rovers/controllers/processCommandsController';
import { getRoverHistory } from './modules/rovers/controllers/getHistoryController';
import { authMiddleware } from './modules/auth/middleware/authMiddleware';
import { registerUser } from './modules/auth/controllers/registerController';
import { loginUser } from './modules/auth/controllers/loginController';
import { deleteRoverHistory } from './modules/rovers/controllers/deleteRoverHistory';

const router = Router();

router.get('/history', authMiddleware, getRoverHistory);
router.post('/commands', authMiddleware, processCommands);
router.delete('/history/delete', authMiddleware, deleteRoverHistory);

export default router;