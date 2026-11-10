const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

// 1. Copy compiled index.html to root
if (fs.existsSync(path.join(DIST, 'index.html'))) {
  fs.copyFileSync(path.join(DIST, 'index.html'), path.join(ROOT, 'index.html'));
  console.log('[post-build] Copied dist/index.html -> root index.html');
}

// 2. Copy compiled assets/ to root assets/
if (fs.existsSync(path.join(DIST, 'assets'))) {
  if (fs.existsSync(path.join(ROOT, 'assets'))) {
    fs.rmSync(path.join(ROOT, 'assets'), { recursive: true, force: true });
  }
  fs.cpSync(path.join(DIST, 'assets'), path.join(ROOT, 'assets'), { recursive: true });
  console.log('[post-build] Copied dist/assets -> root assets/');
}

// 3. Copy compiled images/ to root images/
if (fs.existsSync(path.join(DIST, 'images'))) {
  fs.cpSync(path.join(DIST, 'images'), path.join(ROOT, 'images'), { recursive: true });
  console.log('[post-build] Copied dist/images -> root images/');
}

// 4. Ensure .nojekyll in root and dist
fs.writeFileSync(path.join(ROOT, '.nojekyll'), '');
fs.writeFileSync(path.join(DIST, '.nojekyll'), '');
console.log('[post-build] Created .nojekyll in root and dist');
