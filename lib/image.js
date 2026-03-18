const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const db = require('../config/db');

const SLOT_SIZES = {
  'hero-slide': { width: 1200, height: 800, quality: 80 },
  'products-hero': { width: 1400, height: 600, quality: 80 },
  'card': { width: 600, height: 400, quality: 80 },
  'detail': { width: 800, height: 533, quality: 80 },
  'about': { width: 600, height: 400, quality: 80 },
  'logo': { width: 400, height: 200, quality: 90, fit: 'contain' }
};

function getSlotDimensions(slot) {
  for (const [prefix, dims] of Object.entries(SLOT_SIZES)) {
    if (slot.startsWith(prefix)) return dims;
  }
  return { width: 800, height: 600, quality: 80 };
}

function getSlotCategory(slot) {
  if (slot.startsWith('hero-slide')) return 'hero';
  if (slot.startsWith('products-hero')) return 'products';
  if (slot.startsWith('card')) return 'products';
  if (slot.startsWith('detail')) return 'products';
  if (slot.startsWith('about')) return 'about';
  if (slot.startsWith('logo')) return 'logo';
  return 'misc';
}

async function processAndSave(buffer, slot, originalFilename) {
  const dims = getSlotDimensions(slot);
  const category = getSlotCategory(slot);
  const filename = `${slot}.webp`;
  const relPath = `/uploads/${category}/${filename}`;
  const absPath = path.join(__dirname, '..', 'public', 'uploads', category, filename);

  const dir = path.dirname(absPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const sharpInstance = sharp(buffer).resize(dims.width, dims.height, {
    fit: dims.fit || 'cover',
    position: 'center',
    withoutEnlargement: false
  });

  const result = await sharpInstance
    .webp({ quality: dims.quality || 80, effort: 6 })
    .toFile(absPath);

  const stmt = db.prepare(`
    UPDATE images SET
      file_path = ?,
      original_filename = ?,
      width = ?,
      height = ?,
      file_size = ?,
      updated_at = datetime('now')
    WHERE slot = ?
  `);
  stmt.run(relPath, originalFilename, result.width, result.height, result.size, slot);

  return {
    slot,
    file_path: relPath,
    width: result.width,
    height: result.height,
    file_size: result.size
  };
}

function deleteImage(filePath) {
  const absPath = path.join(__dirname, '..', 'public', filePath);
  if (fs.existsSync(absPath)) {
    fs.unlinkSync(absPath);
  }
}

module.exports = { processAndSave, deleteImage, getSlotDimensions, getSlotCategory, SLOT_SIZES };
