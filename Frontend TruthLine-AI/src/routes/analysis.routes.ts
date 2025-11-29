import { Router } from 'express';
import { analyzeTextController } from '../controllers/scan.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authenticate(), analyzeTextController);

export default router;

