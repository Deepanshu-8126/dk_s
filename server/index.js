/**
 * Standalone Node.js HTTP Server for Production or Independent Execution
 */

import http from 'http';
import { handleApiRequest } from './apiRouter.js';

const PORT = parseInt(process.env.PORT, 10) || 3001;

const server = http.createServer(async (req, res) => {
  // CORS support for development flexibility
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  if (req.url && req.url.startsWith('/api/')) {
    await handleApiRequest(req, res);
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'NOT_FOUND', message: 'Endpoint not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`[UniqueDigit API Server] Listening on http://localhost:${PORT}`);
});
