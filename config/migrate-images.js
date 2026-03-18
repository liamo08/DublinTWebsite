const https = require('https');
const http = require('http');
const db = require('./db');
const { processAndSave } = require('../lib/image');

async function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function migrate() {
  const images = db.prepare('SELECT * FROM images ORDER BY slot').all();
  console.log(`Found ${images.length} image slots to migrate.`);

  let success = 0;
  let failed = 0;

  for (const img of images) {
    if (img.file_path.startsWith('/uploads/')) {
      console.log(`  [skip] ${img.slot} - already local`);
      success++;
      continue;
    }

    if (!img.file_path.startsWith('http')) {
      console.log(`  [skip] ${img.slot} - not a URL`);
      continue;
    }

    console.log(`  [download] ${img.slot}...`);
    let retries = 3;
    while (retries > 0) {
      try {
        const buffer = await downloadImage(img.file_path);
        const result = await processAndSave(buffer, img.slot, img.slot + '.webp');
        console.log(`  [done] ${img.slot} -> ${result.file_path} (${result.width}x${result.height}, ${Math.round(result.file_size / 1024)}KB)`);
        success++;
        break;
      } catch (err) {
        retries--;
        if (retries > 0) {
          console.log(`  [retry] ${img.slot} - ${err.message} (${retries} retries left)`);
          await sleep(1000);
        } else {
          console.error(`  [FAILED] ${img.slot} - ${err.message}`);
          failed++;
        }
      }
    }

    await sleep(300);
  }

  console.log(`\nMigration complete: ${success} succeeded, ${failed} failed.`);
}

migrate().catch(err => {
  console.error('Migration error:', err);
  process.exit(1);
});
