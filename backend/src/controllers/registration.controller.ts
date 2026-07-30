import { Request, Response, NextFunction } from 'express';
import { RegistrationService } from '../services/registration.service';
import { AuthRequest } from '../types';

export async function createRegistration(req: Request, res: Response, next: NextFunction) {
  try {
    const { eventId, fullName, email, mobileNumber, college, city, customAnswers } = req.body;

    if (!eventId || !fullName || !email || !mobileNumber || !college || !city) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: eventId, fullName, email, mobileNumber, college, city',
      });
    }

    const registration = await RegistrationService.createRegistration({
      eventId,
      fullName,
      email,
      mobileNumber,
      college,
      city,
      customAnswers,
    });

    return res.status(201).json({
      success: true,
      message: 'Registration initiated successfully',
      data: registration,
    });
  } catch (error) {
    next(error);
  }
}

export async function lookupRegistration(req: Request, res: Response, next: NextFunction) {
  try {
    const { registrationId, email } = req.query;
    if (!registrationId || !email) {
      return res.status(400).json({
        success: false,
        message: 'Query params registrationId and email are required',
      });
    }

    const registration = await RegistrationService.getRegistrationByIdAndEmail(
      registrationId as string,
      email as string
    );

    return res.status(200).json({
      success: true,
      data: registration,
    });
  } catch (error) {
    next(error);
  }
}

export async function getEventRegistrations(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { eventId } = req.params;
    const registrations = await RegistrationService.getRegistrationsByEvent(eventId);
    return res.status(200).json({
      success: true,
      data: registrations,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllRegistrationsStaff(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const registrations = await RegistrationService.getAllRegistrations();
    return res.status(200).json({
      success: true,
      data: registrations,
    });
  } catch (error) {
    next(error);
  }
}
