import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import { connectDB } from './config/db';
import { errorHandler } from './middlewares/error.middleware';
import healthRoutes from './routes/health.routes';
import authRoutes from './routes/auth.routes';
import adminRoutes from './routes/admin.routes';
import eventRoutes from './routes/event.routes';
import registrationRoutes from './routes/registration.routes';
import paymentRoutes from './routes/payment.routes';
import attendanceRoutes from './routes/attendance.routes';
import certificateRoutes from './routes/certificate.routes';

const app = express();

// Middlewares
app.use(cors({ origin: env.FRONTEND_URL, credentials: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/certificates', certificateRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Supernova 2027 Official API Gateway',
    version: '1.0.0',
    documentation: '/api/health',
  });
});

// Error Handler
app.use(errorHandler);

const PORT = parseInt(env.PORT, 10);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Supernova 2027 Backend running on port ${PORT} [${env.NODE_ENV}]`);
});
