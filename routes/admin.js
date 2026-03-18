const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const { getPageContent, getPageContentRaw, getPageMeta, getSettings, getAllImages, getAllPages } = require('../lib/content');
const { getThemeVars } = require('../lib/theme');

// Login
router.get('/login', (req, res) => {
  res.render('admin/login', { error: null });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    req.session.isAdmin = true;
    return res.redirect('/admin');
  }
  res.render('admin/login', { error: 'Invalid credentials' });
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

// Dashboard
router.get('/', requireAuth, (req, res) => {
  const pages = getAllPages();
  const settings = getSettings();
  const images = getAllImages();
  res.render('admin/dashboard', { pages, settings, imageCount: images.length });
});

// Content editor
router.get('/content/:page', requireAuth, (req, res) => {
  const page = req.params.page.replace(/-/g, '/');
  const contentRaw = getPageContentRaw(page);
  const meta = getPageMeta(page);
  if (!meta && contentRaw.length === 0) {
    return res.status(404).send('Page not found');
  }
  res.render('admin/content', { contentRaw, meta, pageName: page, settings: getSettings() });
});

// Images
router.get('/images', requireAuth, (req, res) => {
  const images = getAllImages();
  res.render('admin/images', { images, settings: getSettings() });
});

// Theme
router.get('/theme', requireAuth, (req, res) => {
  const vars = getThemeVars();
  res.render('admin/theme', { vars, settings: getSettings() });
});

// Logo
router.get('/logo', requireAuth, (req, res) => {
  const settings = getSettings();
  res.render('admin/logo', { settings });
});

// Settings
router.get('/settings', requireAuth, (req, res) => {
  const settings = getSettings();
  res.render('admin/settings', { settings });
});

module.exports = router;
