const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const JWT_SECRET = process.env.JWT_SECRET || 'verde-cms-super-secret-2024-change-this';
const ACCESS_TOKEN_EXPIRES = '15m';   // Short-lived access token
const REFRESH_TOKEN_EXPIRES = '7d';   // Long-lived refresh token

// ─── Middleware: verify access token ───────────────────────────────────────────
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided, unauthorized' });
  }
  try {
    const token = authHeader.split(' ')[1];
    req.admin = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Access token expired', code: 'TOKEN_EXPIRED' });
    }
    return res.status(401).json({ success: false, message: 'Token invalid or expired' });
  }
};

// ─── POST /api/auth/login ──────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Generate access token (short-lived)
    const accessToken = jwt.sign(
      { id: admin._id, email: admin.email, type: 'access' },
      JWT_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRES }
    );

    // Generate refresh token (long-lived)
    const refreshToken = jwt.sign(
      { id: admin._id, email: admin.email, type: 'refresh' },
      JWT_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRES }
    );

    res.json({
      success: true,
      accessToken,
      refreshToken,
      admin: { email: admin.email },
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── POST /api/auth/refresh ────────────────────────────────────────────────────
// Use refresh token to get new access token
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ success: false, message: 'Refresh token required' });
    }

    // Verify refresh token
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ success: false, message: 'Invalid or expired refresh token', code: 'REFRESH_EXPIRED' });
    }

    // Check if it's a refresh token type
    if (decoded.type !== 'refresh') {
      return res.status(401).json({ success: false, message: 'Invalid token type' });
    }

    // Check if admin still exists
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Admin not found' });
    }

    // Generate new access token
    const accessToken = jwt.sign(
      { id: admin._id, email: admin.email, type: 'access' },
      JWT_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRES }
    );

    res.json({
      success: true,
      accessToken,
    });
  } catch (err) {
    console.error('Refresh error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── POST /api/auth/change-password [protected] ───────────────────────────────
router.post('/change-password', protect, async (req, res) => {
  try {
    const { currentPassword, newEmail, newPassword } = req.body;

    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    // Verify current password
    const isMatch = await admin.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    }

    // Apply changes
    if (newEmail && newEmail.trim()) {
      admin.email = newEmail.trim().toLowerCase();
    }
    if (newPassword) {
      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'New password must be at least 6 characters',
        });
      }
      admin.password = newPassword; // pre-save hook will hash it
    }

    await admin.save();

    // Issue fresh tokens
    const accessToken = jwt.sign(
      { id: admin._id, email: admin.email, type: 'access' },
      JWT_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRES }
    );

    const refreshToken = jwt.sign(
      { id: admin._id, email: admin.email, type: 'refresh' },
      JWT_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRES }
    );

    res.json({
      success: true,
      message: 'Credentials updated successfully!',
      accessToken,
      refreshToken,
      admin: { email: admin.email },
    });
  } catch (err) {
    console.error('Change password error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── GET /api/auth/verify [protected] ─────────────────────────────────────────
router.get('/verify', protect, (req, res) => {
  res.json({ success: true, admin: req.admin });
});

module.exports = router;
