import { mailTransporter } from '../config/mailer';
import { env } from '../config/env';
import { logger } from '../utils/logger';
import { getRegistrationConfirmationTemplate } from '../templates/registrationConfirmation';
import { getCertificateNotificationTemplate } from '../templates/certificateNotification';

export class EmailService {
  static async sendRegistrationConfirmation(data: {
    email: string;
    fullName: string;
    registrationId: string;
    eventName: string;
    venue: string;
    eventDate: string;
    reportingTime: string;
    amount: number;
    razorpayPaymentId?: string;
  }) {
    try {
      const attendanceUrl = `${env.FRONTEND_URL}/attendance/scan?regId=${data.registrationId}`;
      const htmlContent = getRegistrationConfirmationTemplate({
        ...data,
        attendanceUrl,
      });

      const mailOptions = {
        from: env.SMTP_FROM,
        to: data.email,
        subject: `🎉 Congratulations! Supernova 2026 Registration Confirmed - ${data.eventName} (${data.registrationId})`,
        html: htmlContent,
      };

      const info = await mailTransporter.sendMail(mailOptions);
      logger.info(`📧 Registration confirmation email & receipt sent to ${data.email}. MessageId: ${info.messageId}`);
    } catch (error: any) {
      logger.error(`❌ Failed to send registration email to ${data.email}: ${error.message}`);
    }
  }

  static async sendCertificateNotification(data: {
    email: string;
    fullName: string;
    eventName: string;
    certificateNo: string;
    pdfBuffer?: Uint8Array;
  }) {
    try {
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; background: #030712; color: #ffffff; padding: 24px; border-radius: 12px; max-width: 600px; border: 1px solid #06b6d4;">
          <h2 style="color: #22d3ee;">Official Merit & Participation Certificate - Supernova 2026</h2>
          <p>Dear <strong>${data.fullName}</strong>,</p>
          <p>Congratulations on successfully participating in <strong>${data.eventName}</strong> at Supernova 2026!</p>
          <div style="background: #0a0f1e; border: 1px solid #06b6d4; padding: 16px; border-radius: 8px; font-family: monospace; color: #a855f7; font-size: 18px; font-weight: bold; text-align: center;">
            Certificate No: ${data.certificateNo}
          </div>
          <p style="margin-top: 16px; color: #94a3b8;">Your official PDF Certificate has been generated and is attached directly to this email for your permanent records.</p>
          <p style="color: #64748b; font-size: 12px; text-align: center; margin-top: 24px;">Supernova 2026 • National Technical Fest Paradigm</p>
        </div>
      `;

      const attachments: any[] = [];
      if (data.pdfBuffer) {
        attachments.push({
          filename: `Supernova2026_Certificate_${data.certificateNo}.pdf`,
          content: Buffer.from(data.pdfBuffer),
          contentType: 'application/pdf',
        });
      }

      const mailOptions = {
        from: env.SMTP_FROM,
        to: data.email,
        subject: `📜 Official Certificate Attached - Supernova 2026 (${data.eventName})`,
        html: htmlContent,
        attachments,
      };

      const info = await mailTransporter.sendMail(mailOptions);
      logger.info(`📧 Certificate PDF email sent directly to ${data.email}. MessageId: ${info.messageId}`);
    } catch (error: any) {
      logger.error(`❌ Failed to send certificate email to ${data.email}: ${error.message}`);
    }
  }
}
