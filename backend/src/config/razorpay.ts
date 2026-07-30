import Razorpay from 'razorpay';
import { env } from './env';

export const razorpayInstance = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID || 'rzp_test_sample_key',
  key_secret: env.RAZORPAY_KEY_SECRET || 'sample_secret_key',
});
