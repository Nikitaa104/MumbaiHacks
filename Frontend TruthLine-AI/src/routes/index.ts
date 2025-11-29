import { Router } from 'express';
import authRoutes from './auth.routes.js';
import analysisRoutes from './analysis.routes.js';
import spamRoutes from './spam.routes.js';
import scanRoutes from './scan.routes.js';
import fileRoutes from './file.routes.js';
import userRoutes from './user.routes.js';
import settingsRoutes from './settings.routes.js';
import validationRoutes from './validation.routes.js';
import darkPatternRoutes from './darkPattern.routes.js';
import extractRoutes from './extract.routes.js';
import reportRoutes from './report.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/analyze', analysisRoutes);
router.use('/spam-detect', spamRoutes);
router.use('/scans', scanRoutes);
router.use('/files', fileRoutes);
router.use('/users', userRoutes);
router.use('/settings', settingsRoutes);
router.use('/validate-email', validationRoutes);
router.use('/dark-patterns', darkPatternRoutes);
router.use('/extract', extractRoutes);
router.use('/generate-report', reportRoutes);

export default router;

