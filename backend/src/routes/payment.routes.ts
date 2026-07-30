import { Router } from 'express';
import { verifyPayment, handleWebhook, getFinanceDashboard } from '../controllers/payment.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import { Role } from '@prisma/client';

const router = Router();

// Public verification & webhooks
router.post('/verify', verifyPayment);
router.post('/webhook', handleWebhook);

// Protected Finance Dashboard route
router.get(
  '/dashboard',
  authenticate,
  requireRole([Role.FINANCE, Role.ADMIN]),
  getFinanceDashboard
);

export default router;
