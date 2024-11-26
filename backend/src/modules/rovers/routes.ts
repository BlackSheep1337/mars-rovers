import { Router } from 'express';
import { processCommands } from './controllers/processCommandsController';
import { getRoverHistory } from './controllers/getHistoryController';
import { authMiddleware } from '../auth/middleware/authMiddleware';
import { deleteRoverHistory } from './controllers/deleteRoverHistoryController';

const router = Router();

router.get('/history', authMiddleware, getRoverHistory);
router.post('/commands', authMiddleware, processCommands);
router.delete('/history/delete', authMiddleware, deleteRoverHistory);

export default router;
