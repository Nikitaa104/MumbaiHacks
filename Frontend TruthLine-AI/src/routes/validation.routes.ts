import { Router } from 'express';
import { validateEmailController } from '../controllers/validation.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authenticate(true), validateEmailController);

export default router;

