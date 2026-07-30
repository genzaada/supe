import { Router } from 'express';
import {
  getPublicEvents,
  getAllEventsStaff,
  getEventBySlug,
  createEvent,
  updateEvent,
  updateEventStatus,
  deleteEvent,
} from '../controllers/event.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import { Role } from '@prisma/client';

const router = Router();

// Public routes
router.get('/', getPublicEvents);
router.get('/slug/:slug', getEventBySlug);

// Staff / Admin routes
router.get('/staff/all', authenticate, requireRole([Role.ADMIN, Role.ORGANIZER, Role.FINANCE]), getAllEventsStaff);
router.post('/', authenticate, requireRole([Role.ADMIN, Role.ORGANIZER]), createEvent);
router.put('/:id', authenticate, requireRole([Role.ADMIN, Role.ORGANIZER]), updateEvent);
router.patch('/:id/status', authenticate, requireRole([Role.ADMIN, Role.ORGANIZER]), updateEventStatus);
router.delete('/:id', authenticate, requireRole([Role.ADMIN, Role.ORGANIZER]), deleteEvent);

export default router;
