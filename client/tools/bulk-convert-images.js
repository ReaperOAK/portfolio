import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.resolve(process.cwd(), 'public');
const folders = ['logo', 'bg'];

async function convertFile(srcPath) {
  const rel = path.relative(publicDir, srcPath);
  const base = srcPath.replace(/\.png$/i, '');
  const avifOut = base + '.avif';
  const webpOut = base + '.webp';

  if (fs.existsSync(avifOut) && fs.existsSync(webpOut)) {
    console.log('Skipping (already converted):', rel);
    return;
  }

  try {
    const img = sharp(srcPath).rotate();
    // Resize large backgrounds to reasonable widths, keep logos small
    const isBg = rel.startsWith('bg' + path.sep);
    const width = isBg ? 1600 : 800;

    await img.clone().resize({ width }).avif({ quality: 60 }).toFile(avifOut);
    await img.clone().resize({ width }).webp({ quality: 75 }).toFile(webpOut);
    console.log('Generated:', path.relative(publicDir, avifOut), path.relative(publicDir, webpOut));
  } catch (err) {
    console.error('Error converting', rel, err.message || err);
  }
}

async function main() {
  for (const folder of folders) {
    const dir = path.join(publicDir, folder);
    if (!fs.existsSync(dir)) continue;
    const list = fs.readdirSync(dir).filter(f => /\.png$/i.test(f));
    for (const f of list) {
      const p = path.join(dir, f);
      // convert
      // eslint-disable-next-line no-await-in-loop
      await convertFile(p);
    }
  }
}

main().catch(err => { console.error(err); process.exit(1); });
