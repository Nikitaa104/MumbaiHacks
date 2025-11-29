import { Router } from 'express';
import { detectDarkPatternsController } from '../controllers/darkPattern.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authenticate(true), detectDarkPatternsController);

export default router;

