const fs = require('fs');

function search(dir) {
  for (const f of fs.readdirSync(dir, {withFileTypes: true})) {
    const p = dir + '/' + f.name;
    if (f.isDirectory()) search(p);
    else if (f.name.endsWith('.js')) {
      const c = fs.readFileSync(p, 'utf8');
      if (c.includes('createAnalytic3dSdfSetup')) {
        console.log('Found createAnalytic3dSdfSetup in:', p);
        const idx = c.indexOf('createAnalytic3dSdfSetup');
        console.log(c.slice(idx - 50, idx + 800));
      }
    }
  }
}
search('node_modules/shaders/dist');
