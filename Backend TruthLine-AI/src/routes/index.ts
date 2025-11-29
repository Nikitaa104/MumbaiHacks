import { Router } from 'express';
import authRoutes from './auth.routes';
import analysisRoutes from './analysis.routes';
import spamRoutes from './spam.routes';
import scanRoutes from './scan.routes';
import fileRoutes from './file.routes';
import userRoutes from './user.routes';
import settingsRoutes from './settings.routes';
import validationRoutes from './validation.routes';
import darkPatternRoutes from './darkPattern.routes';
import extractRoutes from './extract.routes';
import reportRoutes from './report.routes';

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

