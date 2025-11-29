import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { dashboard, getMe, updateMe } from '../controllers/user.controller';

const router = Router();

router.get('/me', authenticate(), getMe);
router.put('/me', authenticate(), updateMe);
router.get('/dashboard', authenticate(), dashboard);

export default router;

