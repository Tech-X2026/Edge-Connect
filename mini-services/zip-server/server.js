const http = require('http');
const fs = require('fs');
const path = require('path');

const FULL_ZIP = '/home/z/my-project.zip';
const SOURCE_ZIP = '/home/z/edge-connect-source.zip';

const server = http.createServer((req, res) => {
  // Parse the URL to get the path
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  res.setHeader('Access-Control-Allow-Origin', '*');

  if (pathname === '/api/download') {
    // Full project download (5.7 MB - includes hero video)
    try {
      const stat = fs.statSync(FULL_ZIP);
      res.writeHead(200, {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="edge-connect-full-project.zip"',
        'Content-Length': stat.size.toString(),
      });
      fs.createReadStream(FULL_ZIP).pipe(res);
    } catch (err) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'File not found' }));
    }
  } else if (pathname === '/api/download-source') {
    // Source-only download (213 KB - no video, no node_modules)
    try {
      const stat = fs.statSync(SOURCE_ZIP);
      res.writeHead(200, {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="edge-connect-source.zip"',
        'Content-Length': stat.size.toString(),
      });
      fs.createReadStream(SOURCE_ZIP).pipe(res);
    } catch (err) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'File not found' }));
    }
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<html><body>
      <h2>EDGE CONNECT - Project Downloads</h2>
      <ul>
        <li><a href="/api/download-source">Source Code Only</a> (213 KB - recommended)</li>
        <li><a href="/api/download">Full Project</a> (5.7 MB - includes hero video)</li>
      </ul>
    </body></html>`);
  }
});

server.listen(3031, '0.0.0.0', () => console.log('Zip download server running on port 3031'));
