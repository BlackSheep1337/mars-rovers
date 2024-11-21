import { Router } from 'express';
import { processCommands } from './controllers/roverController';

const router = Router();

router.post('/commands', processCommands);

export default router;