import { Router } from 'express';
import { spamDetectController } from '../controllers/spam.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authenticate(), spamDetectController);

export default router;

