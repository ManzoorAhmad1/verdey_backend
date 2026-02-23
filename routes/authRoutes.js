const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const JWT_SECRET = process.env.JWT_SECRET || 'verde-cms-super-secret-2024-change-this';
const JWT_EXPIRES = '7d';

// ─── Middleware: verify token ──────────────────────────────────────────────────
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Token nahi mili, unauthorized' });
  }
  try {
    const token = authHeader.split(' ')[1];
    req.admin = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Token invalid ya expire ho gayi' });
  }
};

// ─── POST /api/auth/login ──────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email aur password dono zaroori hain' });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Galat email ya password hai' });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Galat email ya password hai' });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );

    res.json({
      success: true,
      token,
      admin: { email: admin.email },
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── POST /api/auth/change-password [protected] ───────────────────────────────
router.post('/change-password', protect, async (req, res) => {
  try {
    const { currentPassword, newEmail, newPassword } = req.body;

    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin nahi mila' });
    }

    // Verify current password
    const isMatch = await admin.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Purana password galat hai' });
    }

    // Apply changes
    if (newEmail && newEmail.trim()) {
      admin.email = newEmail.trim().toLowerCase();
    }
    if (newPassword) {
      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'Naya password kam az kam 6 characters ka hona chahiye',
        });
      }
      admin.password = newPassword; // pre-save hook will hash it
    }

    await admin.save();

    // Issue a fresh token (email may have changed)
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );

    res.json({
      success: true,
      message: 'Credentials successfully update ho gaye!',
      token,
      admin: { email: admin.email },
    });
  } catch (err) {
    console.error('Change password error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── GET /api/auth/verify [protected] ─────────────────────────────────────────
// Used by CMS middleware to verify a JWT without the edge-runtime jose library
router.get('/verify', protect, (req, res) => {
  res.json({ success: true, admin: req.admin });
});

module.exports = router;
