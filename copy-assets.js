import fs from 'fs';
import path from 'path';

const brainDir = 'C:\\Users\\thesh\\.gemini\\antigravity-ide\\brain\\f6282953-92ca-4f14-a9ca-4f2b4a912e45';
const targetDir = 'g:\\HouseOfBuns\\public\\images';

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const fileMap = {
  'hero_smashed_burger_1788681171340.jpg': 'hero-burger.jpg',
  'house_combo_spread_1788681190909.jpg': 'combo-spread.jpg',
  'crispy_chicken_burger_1788681239213.jpg': 'crispy-chicken.jpg',
  'truffle_veg_burger_1788681259141.jpg': 'truffle-veg.jpg',
  'loaded_cheese_fries_1788681288149.jpg': 'loaded-fries.jpg',
  'craft_thick_shakes_1788681329619.jpg': 'craft-shakes.jpg',
  'golden_brioche_buns_1788681344950.jpg': 'brioche-buns.jpg',
  'indore_flagship_outlet_1788681362024.jpg': 'outlet-flagship.jpg',
};

for (const [src, dest] of Object.entries(fileMap)) {
  const srcPath = path.join(brainDir, src);
  const destPath = path.join(targetDir, dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${src} -> ${dest}`);
  } else {
    console.warn(`Source not found: ${srcPath}`);
  }
}
console.log('Asset copying complete.');
