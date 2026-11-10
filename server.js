import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const ROOT = path.join(__dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  let reqUrl = decodeURI(req.url.split('?')[0]);
  if (reqUrl === '/') reqUrl = '/index.html';

  if (reqUrl === '/favicon.ico') {
    res.writeHead(204);
    res.end();
    return;
  }

  const safePath = path.normalize(path.join(ROOT, reqUrl));

  if (!safePath.startsWith(ROOT)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  fs.stat(safePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for SPA routing
      const indexPath = path.join(ROOT, 'index.html');
      fs.readFile(indexPath, (readErr, content) => {
        if (readErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Not Found');
        } else {
          res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
            'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
          });
          res.end(content);
        }
      });
      return;
    }

    const ext = path.extname(safePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    const isImage = ext.match(/\.(jpg|jpeg|png|webp|gif|svg)$/);
    const headers = {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': isImage
        ? 'public, max-age=3600'
        : 'no-store, no-cache, must-revalidate, max-age=0',
    };

    res.writeHead(200, headers);
    fs.createReadStream(safePath).pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`DTDC Logistics & Consulting App live at: http://localhost:${PORT}/`);
});
