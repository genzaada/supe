import { Router } from 'express';
import { getUsers, createUser, deleteUser } from '../controllers/admin.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import { Role } from '@prisma/client';

const router = Router();

// Protect all admin routes
router.use(authenticate);
router.use(requireRole([Role.ADMIN]));

router.get('/users', getUsers);
router.post('/users', createUser);
router.delete('/users/:id', deleteUser);

export default router;
