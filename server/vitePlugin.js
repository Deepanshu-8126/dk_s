/**
 * Vite Dev & Preview Server Middleware Plugin
 * Connects /api/* requests directly to server/apiRouter.js without separate dev server.
 */

import { handleApiRequest } from './apiRouter.js';

export function uniqueDigitApiPlugin() {
  return {
    name: 'uniquedigit-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api/')) {
          await handleApiRequest(req, res);
        } else {
          next();
        }
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api/')) {
          await handleApiRequest(req, res);
        } else {
          next();
        }
      });
    }
  };
}
