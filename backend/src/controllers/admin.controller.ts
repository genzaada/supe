import { Request, Response, NextFunction } from 'express';
import { AdminService } from '../services/admin.service';
import { AuthRequest } from '../types';

export async function getUsers(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const users = await AdminService.getAllStaffUsers();
    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
}

export async function createUser(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ success: false, message: 'Missing required fields: name, email, password, role' });
    }

    const user = await AdminService.createStaffUser({ name, email, password, role });
    return res.status(201).json({
      success: true,
      message: 'Staff user created successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const result = await AdminService.deleteStaffUser(id);
    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
}
