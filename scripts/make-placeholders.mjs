// Generates labelled tint-block placeholder photos in src/assets/photos/.
// Run: node scripts/make-placeholders.mjs   (only needed once; real photos replace these)
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const out = 'src/assets/photos';
mkdirSync(out, { recursive: true });

const photos = [
  { file: 'category-homeware.jpg', label: 'Homeware', tint: '#DCE6F2', w: 1200, h: 900 },
  { file: 'category-kitchen.jpg', label: 'Kitchen', tint: '#E8E2D6', w: 1200, h: 900 },
  { file: 'category-gifts.jpg', label: 'Gifts', tint: '#E4DCEB', w: 1200, h: 900 },
  { file: 'category-garden.jpg', label: 'Garden', tint: '#DCE9DC', w: 1200, h: 900 },
  { file: 'category-stationery.jpg', label: 'Stationery', tint: '#EFE6D8', w: 1200, h: 900 },
  { file: 'category-local-makers.jpg', label: 'Local makers', tint: '#E2E2E2', w: 1200, h: 900 },
  { file: 'shop-front.jpg', label: 'Shop photo', tint: '#E0E4EA', w: 1600, h: 1200 },
  // Portraits show small (avatar size), so they get one big label only.
  { file: 'team-owner.jpg', label: 'Photo', tint: '#DCE6F2', w: 600, h: 600, portrait: true },
];

for (const p of photos) {
  const caption = p.portrait
    ? ''
    : `<text x="50%" y="${p.h - Math.round(p.h / 12)}" text-anchor="middle"
      font-family="Segoe UI, Arial, sans-serif" font-size="${Math.round(p.w / 32)}" fill="#888">PLACEHOLDER PHOTO</text>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${p.w}" height="${p.h}">
    <rect width="100%" height="100%" fill="${p.tint}"/>
    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
      font-family="Segoe UI, Arial, sans-serif" font-size="${Math.round(p.w / (p.portrait ? 4.5 : 14))}" fill="#555">${p.label}</text>
    ${caption}
  </svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 85 }).toFile(`${out}/${p.file}`);
  console.log('wrote', p.file);
}
