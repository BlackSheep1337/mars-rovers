import { Router } from 'express';
import { processRoverCommands } from './controllers/roverController';

const router = Router();

router.post('/rovers', processRoverCommands);

export default router;