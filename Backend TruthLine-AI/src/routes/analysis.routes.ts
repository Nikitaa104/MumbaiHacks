import { Router } from 'express';
import { analyzeTextController } from '../controllers/scan.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate(), analyzeTextController);

export default router;

