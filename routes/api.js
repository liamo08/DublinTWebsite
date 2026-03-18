const express = require('express');
const router = express.Router();
const multer = require('multer');
const { requireAuth } = require('../middleware/auth');
const { updateContent, batchUpdateContent, updateMeta, updateSettings } = require('../lib/content');
const { updateThemeVars } = require('../lib/theme');
const { processAndSave } = require('../lib/image');
const db = require('../config/db');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Update single content block
router.put('/content/:id', requireAuth, (req, res) => {
  try {
    const result = updateContent(parseInt(req.params.id), req.body.content);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Batch update content blocks
router.put('/content/batch', requireAuth, (req, res) => {
  try {
    batchUpdateContent(req.body.updates);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update page meta
router.put('/meta/:page', requireAuth, (req, res) => {
  try {
    const page = req.params.page.replace(/-/g, '/');
    updateMeta(page, req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Upload image
router.post('/images/:slot', requireAuth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No image file provided' });
    }
    const result = await processAndSave(req.file.buffer, req.params.slot, req.file.originalname);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update theme
router.put('/theme', requireAuth, (req, res) => {
  try {
    updateThemeVars(req.body.vars);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update settings
router.put('/settings', requireAuth, (req, res) => {
  try {
    updateSettings(req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update logo
router.put('/logo', requireAuth, (req, res) => {
  try {
    updateSettings(req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Upload logo image
router.post('/logo/upload', requireAuth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No image file provided' });
    }
    const result = await processAndSave(req.file.buffer, 'logo-main', req.file.originalname);
    const stmt = db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES ('logo_image_path', ?)");
    stmt.run(result.file_path);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
