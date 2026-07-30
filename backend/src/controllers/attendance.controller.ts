import { Request, Response, NextFunction } from 'express';
import { AttendanceService } from '../services/attendance.service';
import { AuthRequest } from '../types';

export async function getEventQR(req: Request, res: Response, next: NextFunction) {
  try {
    const { eventId } = req.params;
    const result = await AttendanceService.generateEventAttendanceQR(eventId);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function markAttendance(req: Request, res: Response, next: NextFunction) {
  try {
    const { registrationId, email, fullName, competition, eventId } = req.body;
    if (!registrationId || !email || !fullName) {
      return res.status(400).json({
        success: false,
        message: 'Registration ID, Email Address, and Full Name are required for attendance verification.',
      });
    }

    const attendance = await AttendanceService.markAttendance({
      registrationId,
      email,
      fullName,
      competition,
      eventId,
    });

    return res.status(200).json({
      success: true,
      message: 'Attendance recorded successfully! Official PDF Certificate has been emailed directly to your inbox.',
      data: attendance,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAttendanceList(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { eventId } = req.params;
    const data = await AttendanceService.getEventAttendanceList(eventId);
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}
