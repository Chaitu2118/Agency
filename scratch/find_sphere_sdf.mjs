import fs from 'fs';

function search(dir) {
  for (const f of fs.readdirSync(dir, {withFileTypes: true})) {
    const p = dir + '/' + f.name;
    if (f.isDirectory()) search(p);
    else if (f.name.endsWith('.js')) {
      const c = fs.readFileSync(p, 'utf8');
      if (c.includes('sphere3D') && c.includes('sdf')) {
        console.log('Found sphere3D sdf in:', p);
        const idx = c.indexOf('sphere3D');
        console.log(c.slice(idx - 100, idx + 400));
      }
    }
  }
}
search('node_modules/shaders/dist');
