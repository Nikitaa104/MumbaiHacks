import { Router } from 'express';
import { spamDetectController } from '../controllers/spam.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate(), spamDetectController);

export default router;

