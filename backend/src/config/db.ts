import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

export async function connectDB() {
  try {
    await prisma.$connect();
    console.log('⚡ PostgreSQL Database connected via Prisma ORM');
  } catch (error) {
    console.error('❌ Database connection failure:', error);
  }
}
