import { Router } from 'express';
import { getEventQR, markAttendance, getAttendanceList } from '../controllers/attendance.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import { Role } from '@prisma/client';

const router = Router();

// Public attendance check-in & QR fetch
router.get('/qr/:eventId', getEventQR);
router.post('/mark', markAttendance);

// Protected Staff route
router.get('/event/:eventId', authenticate, requireRole([Role.ADMIN, Role.ORGANIZER]), getAttendanceList);

export default router;
