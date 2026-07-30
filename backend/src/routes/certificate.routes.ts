import { Router } from 'express';
import { generateCertificates, downloadCertificate, getStats } from '../controllers/certificate.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import { Role } from '@prisma/client';

const router = Router();

// Public download route
router.post('/download', downloadCertificate);

// Protected Staff routes
router.post('/generate/:eventId', authenticate, requireRole([Role.ADMIN, Role.ORGANIZER]), generateCertificates);
router.get('/stats/:eventId', authenticate, requireRole([Role.ADMIN, Role.ORGANIZER]), getStats);

export default router;
