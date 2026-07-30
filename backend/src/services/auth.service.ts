import { prisma } from '../config/db';
import { comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { AppError } from '../middlewares/error.middleware';
import { Role } from '@prisma/client';

const DEFAULT_USERS = [
  {
    id: 'admin-default-id',
    name: 'Supernova Admin',
    emails: ['admin@supernova2026.com', 'admin@supernova2027.com'],
    passwords: ['Supernova@2026', 'Supernova@2027'],
    role: Role.ADMIN,
  },
  {
    id: 'organizer-default-id',
    name: 'Lead Organizer',
    emails: ['organizer@supernova2026.com', 'organizer@supernova2027.com'],
    passwords: ['Supernova@2026', 'Supernova@2027'],
    role: Role.ORGANIZER,
  },
  {
    id: 'finance-default-id',
    name: 'Finance Head',
    emails: ['finance@supernova2026.com', 'finance@supernova2027.com'],
    passwords: ['Supernova@2026', 'Supernova@2027'],
    role: Role.FINANCE,
  },
];

export class AuthService {
  static async login(email: string, password: string) {
    const normalizedEmail = email.toLowerCase().trim();
    let user = null;

    try {
      user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    } catch (dbError: any) {
      console.warn('⚠️ Database query failed during login, checking fallback credentials:', dbError.message);
    }

    if (user) {
      const isMatch = await comparePassword(password, user.password);
      if (isMatch) {
        const token = generateToken({
          userId: user.id,
          email: user.email,
          role: user.role,
        });

        return {
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        };
      }
    }

    // Check default fallback credentials (works even if DB is offline or not yet seeded)
    const defaultAccount = DEFAULT_USERS.find(u => u.emails.includes(normalizedEmail));

    if (defaultAccount && defaultAccount.passwords.includes(password)) {
      const token = generateToken({
        userId: defaultAccount.id,
        email: normalizedEmail,
        role: defaultAccount.role,
      });

      return {
        token,
        user: {
          id: defaultAccount.id,
          name: defaultAccount.name,
          email: normalizedEmail,
          role: defaultAccount.role,
        },
      };
    }

    const err: AppError = new Error('Invalid email or password');
    err.statusCode = 401;
    throw err;
  }

  static async getUserProfile(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });

      if (user) return user;
    } catch (dbError: any) {
      console.warn('⚠️ Database query failed during getUserProfile:', dbError.message);
    }

    const defaultAccount = DEFAULT_USERS.find(u => u.id === userId);
    if (defaultAccount) {
      return {
        id: defaultAccount.id,
        name: defaultAccount.name,
        email: defaultAccount.emails[0],
        role: defaultAccount.role,
        createdAt: new Date(),
      };
    }

    const err: AppError = new Error('User not found');
    err.statusCode = 404;
    throw err;
  }
}
