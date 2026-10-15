import fs from 'fs';
const content = fs.readFileSync('node_modules/shaders/dist/core/Particles-CgvGZNOx.js', 'utf8');

// Find where is3dShapeType is defined
const idx = content.indexOf('is3dShapeType');
console.log('is3dShapeType:', content.slice(idx - 100, idx + 300));

// Find where createAnalytic3dSdfSetup is defined
const aIdx = content.indexOf('createAnalytic3dSdfSetup');
console.log('createAnalytic3dSdfSetup:', content.slice(aIdx, aIdx + 500));
