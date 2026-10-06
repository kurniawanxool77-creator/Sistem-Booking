import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface JwtPayload {
  userId: string;
  username: string;
  role: string;
}

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

/**
 * Middleware: Cek apakah request memiliki JWT yang valid.
 * Jika tidak ada/invalid → 401 Unauthorized.
 */
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    res.status(401).json({ success: false, message: 'Token tidak ditemukan. Silakan login.' });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secret) as JwtPayload;
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Token tidak valid atau sudah kadaluarsa.' });
  }
}

/**
 * Middleware: Cek apakah user yang login adalah ADMIN.
 * Harus dipanggil SETELAH requireAuth.
 */
export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  if (!req.user || req.user.role !== 'ADMIN') {
    res.status(403).json({ success: false, message: 'Akses ditolak. Hanya admin yang bisa mengakses ini.' });
    return;
  }
  next();
}

/**
 * Helper: Buat JWT token
 */
export function generateToken(payload: JwtPayload): string {
  const secret = process.env.JWT_SECRET!;
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
}
