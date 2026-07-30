import { Router } from 'express';
import {
  createRegistration,
  lookupRegistration,
  getEventRegistrations,
  getAllRegistrationsStaff,
} from '../controllers/registration.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import { Role } from '@prisma/client';

const router = Router();

// Public routes (No login required)
router.post('/', createRegistration);
router.get('/lookup', lookupRegistration);

// Staff / Admin routes
router.get('/staff/all', authenticate, requireRole([Role.ADMIN, Role.ORGANIZER, Role.FINANCE]), getAllRegistrationsStaff);
router.get('/event/:eventId', authenticate, requireRole([Role.ADMIN, Role.ORGANIZER]), getEventRegistrations);

export default router;
