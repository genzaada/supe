import { Request, Response, NextFunction } from 'express';
import { CertificateService } from '../services/certificate.service';
import { AuthRequest } from '../types';

export async function generateCertificates(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { eventId } = req.params;
    const result = await CertificateService.generateCertificatesForEvent(eventId);
    return res.status(200).json({
      success: true,
      message: 'Batch certificates generated & email notifications dispatched successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function downloadCertificate(req: Request, res: Response, next: NextFunction) {
  try {
    const { registrationId, email } = req.body;
    if (!registrationId || !email) {
      return res.status(400).json({
        success: false,
        message: 'Registration ID and Email address are required',
      });
    }

    const { pdfBuffer, fileName } = await CertificateService.downloadCertificatePdf(registrationId, email);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    return res.status(200).send(Buffer.from(pdfBuffer));
  } catch (error) {
    next(error);
  }
}

export async function getStats(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { eventId } = req.params;
    const stats = await CertificateService.getCertificateStats(eventId);
    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
}
