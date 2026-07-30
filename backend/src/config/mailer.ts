import nodemailer from 'nodemailer';
import { env } from './env';
import { logger } from '../utils/logger';

export const mailTransporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_PORT === 465,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

mailTransporter.verify((error) => {
  if (error) {
    logger.warn('⚠️ SMTP Transporter configuration warning (Emails will log in dev mode if credentials invalid):', error.message);
  } else {
    logger.info('📧 Mailer connected to SMTP server');
  }
});
