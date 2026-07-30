import { Request, Response } from 'express';
import { prisma } from '../config/db';

export async function checkHealth(req: Request, res: Response) {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return res.status(200).json({
      success: true,
      status: 'UP',
      service: 'Supernova 2027 API',
      timestamp: new Date().toISOString(),
      database: 'Connected',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 'DOWN',
      service: 'Supernova 2027 API',
      timestamp: new Date().toISOString(),
      database: 'Disconnected',
    });
  }
}
