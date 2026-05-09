import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface AuthUser {
  userId: string;
  email: string;
  role: string;
}

export function verifyToken(request: Request | NextRequest): AuthUser | null {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;

    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export function isAdmin(request: Request | NextRequest): boolean {
  const user = verifyToken(request);
  return user?.role === 'ADMIN';
}

export function generateToken(user: AuthUser): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
}