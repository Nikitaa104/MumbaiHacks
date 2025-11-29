import { Router } from 'express';
import { validateEmailController } from '../controllers/validation.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate(true), validateEmailController);

export default router;

