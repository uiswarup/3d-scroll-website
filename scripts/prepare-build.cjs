const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const template = path.join(ROOT, 'index.template.html');
const index = path.join(ROOT, 'index.html');

if (fs.existsSync(template)) {
  fs.copyFileSync(template, index);
  console.log('[build-prep] Restored source index.html for Vite');
}
