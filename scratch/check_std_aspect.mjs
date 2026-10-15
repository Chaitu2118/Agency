import fs from 'fs';
const content = fs.readFileSync('node_modules/shaders/dist/core/std-DcYKWFSQ.js', 'utf8');

let pos = 0;
while (true) {
  const idx = content.indexOf('aspect', pos);
  if (idx === -1) break;
  console.log('--- aspect at', idx, '---');
  console.log(content.slice(Math.max(0, idx - 50), Math.min(content.length, idx + 100)));
  pos = idx + 6;
}
