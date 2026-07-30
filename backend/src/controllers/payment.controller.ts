import { Request, Response, NextFunction } from 'express';
import { PaymentService } from '../services/payment.service';
import { AuthRequest } from '../types';

export async function verifyPayment(req: Request, res: Response, next: NextFunction) {
  try {
    const { registrationId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    if (!registrationId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return res.status(400).json({
        success: false,
        message: 'Missing verification payload: registrationId, razorpayOrderId, razorpayPaymentId, razorpaySignature',
      });
    }

    const result = await PaymentService.verifyAndProcessPayment({
      registrationId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    });

    return res.status(200).json({
      success: true,
      message: 'Payment verified and updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function handleWebhook(req: Request, res: Response, next: NextFunction) {
  try {
    // Razorpay Webhook Event handler
    const event = req.body;
    console.log('🔔 Razorpay Webhook Event Received:', event.event);
    return res.status(200).json({ status: 'ok' });
  } catch (error) {
    next(error);
  }
}

export async function getFinanceDashboard(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const data = await PaymentService.getFinanceDashboardData();
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}
