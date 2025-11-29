import { Router } from 'express';
import { detectDarkPatternsController } from '../controllers/darkPattern.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate(true), detectDarkPatternsController);

export default router;

