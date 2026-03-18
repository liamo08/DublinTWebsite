const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'cms.db');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS theme_vars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    var_name TEXT UNIQUE NOT NULL,
    var_value TEXT NOT NULL,
    var_group TEXT NOT NULL,
    label TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS content_blocks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    page TEXT NOT NULL,
    section TEXT NOT NULL,
    block_key TEXT NOT NULL,
    content TEXT NOT NULL,
    content_type TEXT DEFAULT 'text',
    UNIQUE(page, section, block_key)
  );

  CREATE TABLE IF NOT EXISTS page_meta (
    page TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    keywords TEXT,
    canonical_path TEXT,
    og_title TEXT,
    og_description TEXT
  );

  CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slot TEXT UNIQUE NOT NULL,
    original_filename TEXT,
    file_path TEXT NOT NULL,
    alt_text TEXT NOT NULL,
    width INTEGER NOT NULL,
    height INTEGER NOT NULL,
    file_size INTEGER,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );
`);

module.exports = db;
