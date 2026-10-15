import fs from 'fs';
const content = fs.readFileSync('node_modules/shaders/dist/core/Particles-CgvGZNOx.js', 'utf8');

// Search for .aspect in WGSL or JS
let pos = 0;
while (true) {
  const idx = content.indexOf('.aspect', pos);
  if (idx === -1) break;
  console.log('--- .aspect at', idx, '---');
  console.log(content.slice(Math.max(0, idx - 100), Math.min(content.length, idx + 200)));
  pos = idx + 7;
}
