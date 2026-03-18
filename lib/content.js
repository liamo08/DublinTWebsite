const db = require('../config/db');

const stmts = {
  getPageContent: db.prepare('SELECT * FROM content_blocks WHERE page = ?'),
  getPageMeta: db.prepare('SELECT * FROM page_meta WHERE page = ?'),
  getAllSettings: db.prepare('SELECT key, value FROM settings'),
  getImage: db.prepare('SELECT * FROM images WHERE slot = ?'),
  getAllImages: db.prepare('SELECT * FROM images ORDER BY slot'),
  updateContent: db.prepare('UPDATE content_blocks SET content = ? WHERE id = ?'),
  updateMeta: db.prepare('UPDATE page_meta SET title = ?, description = ?, keywords = ?, og_title = ?, og_description = ? WHERE page = ?'),
  updateSetting: db.prepare('UPDATE settings SET value = ?, updated_at = datetime(\'now\') WHERE key = ?'),
  insertSetting: db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)'),
  getContentById: db.prepare('SELECT * FROM content_blocks WHERE id = ?'),
  getAllPages: db.prepare('SELECT DISTINCT page FROM content_blocks ORDER BY page'),
  getContentByPageSectionKey: db.prepare('SELECT * FROM content_blocks WHERE page = ? AND section = ? AND block_key = ?')
};

function getPageContent(page) {
  const rows = stmts.getPageContent.all(page);
  const result = {};
  for (const row of rows) {
    if (!result[row.section]) result[row.section] = {};
    result[row.section][row.block_key] = row.content;
  }
  return result;
}

function getPageContentRaw(page) {
  return stmts.getPageContent.all(page);
}

function getPageMeta(page) {
  return stmts.getPageMeta.get(page);
}

function getSettings() {
  const rows = stmts.getAllSettings.all();
  const result = {};
  for (const row of rows) {
    result[row.key] = row.value;
  }
  return result;
}

function getImage(slot) {
  return stmts.getImage.get(slot);
}

function getAllImages() {
  return stmts.getAllImages.all();
}

function updateContent(id, content) {
  stmts.updateContent.run(content, id);
  return stmts.getContentById.get(id);
}

function batchUpdateContent(updates) {
  const tx = db.transaction((items) => {
    for (const item of items) {
      stmts.updateContent.run(item.content, item.id);
    }
  });
  tx(updates);
}

function updateMeta(page, data) {
  stmts.updateMeta.run(data.title, data.description, data.keywords, data.og_title, data.og_description, page);
}

function updateSetting(key, value) {
  stmts.insertSetting.run(key, value);
}

function updateSettings(data) {
  const tx = db.transaction((items) => {
    for (const [key, value] of Object.entries(items)) {
      stmts.insertSetting.run(key, value);
    }
  });
  tx(data);
}

function getAllPages() {
  return stmts.getAllPages.all().map(r => r.page);
}

module.exports = {
  getPageContent,
  getPageContentRaw,
  getPageMeta,
  getSettings,
  getImage,
  getAllImages,
  updateContent,
  batchUpdateContent,
  updateMeta,
  updateSetting,
  updateSettings,
  getAllPages
};
