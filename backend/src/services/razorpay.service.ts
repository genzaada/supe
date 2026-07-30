import crypto from 'crypto';
import { razorpayInstance } from '../config/razorpay';
import { env } from '../config/env';

export class RazorpayService {
  static async createOrder(amount: number, receipt: string) {
    // Razorpay amount in paise (1 INR = 100 paise)
    const options = {
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt,
      payment_capture: 1,
    };

    return razorpayInstance.orders.create(options);
  }

  static verifySignature(razorpayOrderId: string, razorpayPaymentId: string, razorpaySignature: string): boolean {
    const text = `${razorpayOrderId}|${razorpayPaymentId}`;
    const secret = env.RAZORPAY_KEY_SECRET || 'sample_secret_key';
    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(text)
      .digest('hex');

    return generatedSignature === razorpaySignature;
  }

  static verifyWebhookSignature(body: string, signature: string): boolean {
    const secret = env.RAZORPAY_WEBHOOK_SECRET || 'webhook_secret_key';
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    return expectedSignature === signature;
  }
}
