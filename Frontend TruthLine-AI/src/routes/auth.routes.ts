import { Router } from 'express';
import {
  login,
  refreshToken,
  register,
  logout,
  forgotPasswordController
} from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshToken);
router.post('/forgot-password', forgotPasswordController);
router.post('/logout', authenticate(), logout);

export default router;

