import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';
import { generateToken, requireAuth } from '../middleware/auth';

const router = Router();

/**
 * POST /api/auth/login
 * Login dengan username + password
 */
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username dan password wajib diisi.' });
    }

    // Cari user di database
    const user = await prisma.user.findUnique({
      where: { username: username.trim() },
    });

    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, message: 'Username atau password salah.' });
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Username atau password salah.' });
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      username: user.username,
      role: user.role,
    });

    return res.json({
      success: true,
      message: 'Login berhasil!',
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          nama: user.nama,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error('[AUTH] Login error:', error);
    return res.status(500).json({ success: false, message: 'Terjadi kesalahan server.' });
  }
});

/**
 * POST /api/auth/register
 * Daftar akun baru
 */
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { nama, email, password } = req.body;

    if (!nama || !email || !password) {
      return res.status(400).json({ success: false, message: 'Nama, email, dan password wajib diisi.' });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: 'Password minimal 8 karakter.' });
    }

    // Cek email sudah dipakai
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Email sudah terdaftar.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Buat username dari email (ambil sebelum @)
    const baseUsername = email.split('@')[0];
    let username = baseUsername;
    let counter = 1;
    while (await prisma.user.findUnique({ where: { username } })) {
      username = `${baseUsername}${counter++}`;
    }

    // Simpan ke DB
    const user = await prisma.user.create({
      data: { nama, email, username, password: hashedPassword, role: 'CUSTOMER' },
    });

    const token = generateToken({
      userId: user.id,
      username: user.username,
      role: user.role,
    });

    return res.status(201).json({
      success: true,
      message: 'Pendaftaran berhasil!',
      data: {
        token,
        user: { id: user.id, username: user.username, nama: user.nama, email: user.email, role: user.role },
      },
    });
  } catch (error) {
    console.error('[AUTH] Register error:', error);
    return res.status(500).json({ success: false, message: 'Terjadi kesalahan server.' });
  }
});

/**
 * GET /api/auth/me
 * Ambil data user yang sedang login (butuh token)
 */
router.get('/me', requireAuth, async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      select: { id: true, username: true, nama: true, email: true, wa: true, kota: true, alamat: true, role: true },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User tidak ditemukan.' });
    }

    return res.json({ success: true, data: user });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Terjadi kesalahan server.' });
  }
});

export default router;
