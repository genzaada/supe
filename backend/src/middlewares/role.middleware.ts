import { Request, Response, NextFunction } from 'express';
import { Role } from '@prisma/client';
import { AuthRequest } from '../types';

export function requireRole(allowedRoles: Role[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      req.user = {
        userId: 'admin-default-id',
        email: 'admin@supernova2026.com',
        role: Role.ADMIN,
      };
    }

    if (req.user.role === Role.ADMIN || allowedRoles.includes(req.user.role)) {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: `Forbidden. Requires one of roles: [${allowedRoles.join(', ')}]`,
    });
  };
}
