import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MAX_BYTES = 500 * 1024; // 500 KB limit per chunk
const distAssetsDir = path.resolve(__dirname, '../../dist/assets');

export function checkBundleSize() {
  if (!fs.existsSync(distAssetsDir)) {
    console.warn('[BundleCheck] dist/assets directory does not exist.');
    return;
  }

  const files = fs.readdirSync(distAssetsDir).filter(f => f.endsWith('.js'));
  let hasFailed = false;

  console.log('\n=== BUNDLE SIZE AUDIT (Strict 500KB Limit) ===');
  for (const file of files) {
    const filePath = path.join(distAssetsDir, file);
    const size = fs.statSync(filePath).size;
    const kb = (size / 1024).toFixed(2);

    if (size > MAX_BYTES) {
      console.error(`❌ [FAIL] ${file}: ${kb} KB exceeds limit of 500 KB!`);
      hasFailed = true;
    } else {
      console.log(`✅ [PASS] ${file}: ${kb} KB (OK)`);
    }
  }

  if (hasFailed) {
    console.error('Build failed due to oversized bundle chunk.');
    process.exit(1);
  }
}

checkBundleSize();
