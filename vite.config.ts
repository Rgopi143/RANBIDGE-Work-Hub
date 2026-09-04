import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import {
  getAllDbData,
  upsertEmployee,
  deleteEmployeeDb,
  upsertTask,
  deleteTaskDb,
  upsertTeam,
  deleteTeamDb,
  upsertProject,
  deleteProjectDb,
  upsertDocument,
  deleteDocumentDb,
  upsertChatMessage,
  deleteChatMessageDb,
  testDbConnection
} from './db';

function expressApiPlugin(): Plugin {
  return {
    name: 'express-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '';

        if (url === '/api/db/data' && req.method === 'GET') {
          try {
            const data = await getAllDbData();
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, data }));
            return;
          } catch (err: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: err.message }));
            return;
          }
        }

        if (url === '/api/db/status' && req.method === 'GET') {
          try {
            const status = await testDbConnection();
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, ...status }));
            return;
          } catch (err: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: err.message }));
            return;
          }
        }

        if (url === '/api/db/employees' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const emp = JSON.parse(body);
              await upsertEmployee(emp);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true }));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
          return;
        }

        if (url.startsWith('/api/db/employees/') && req.method === 'DELETE') {
          const id = url.replace('/api/db/employees/', '');
          try {
            await deleteEmployeeDb(id);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
            return;
          } catch (err: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: err.message }));
            return;
          }
        }

        if (url === '/api/db/tasks' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const task = JSON.parse(body);
              await upsertTask(task);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true }));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
          return;
        }

        if (url.startsWith('/api/db/tasks/') && req.method === 'DELETE') {
          const id = url.replace('/api/db/tasks/', '');
          try {
            await deleteTaskDb(id);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
            return;
          } catch (err: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: err.message }));
            return;
          }
        }

        if (url === '/api/db/teams' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const team = JSON.parse(body);
              await upsertTeam(team);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true }));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
          return;
        }

        if (url.startsWith('/api/db/teams/') && req.method === 'DELETE') {
          const id = url.replace('/api/db/teams/', '');
          try {
            await deleteTeamDb(id);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
            return;
          } catch (err: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: err.message }));
            return;
          }
        }

        if (url === '/api/db/projects' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const proj = JSON.parse(body);
              await upsertProject(proj);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true }));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
          return;
        }

        if (url.startsWith('/api/db/projects/') && req.method === 'DELETE') {
          const id = url.replace('/api/db/projects/', '');
          try {
            await deleteProjectDb(id);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
            return;
          } catch (err: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: err.message }));
            return;
          }
        }

        if (url === '/api/db/documents' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const doc = JSON.parse(body);
              await upsertDocument(doc);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true }));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
          return;
        }

        if (url.startsWith('/api/db/documents/') && req.method === 'DELETE') {
          const id = url.replace('/api/db/documents/', '');
          try {
            await deleteDocumentDb(id);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
            return;
          } catch (err: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: err.message }));
            return;
          }
        }

        if (url === '/api/db/chat' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const msg = JSON.parse(body);
              await upsertChatMessage(msg);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true }));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
          return;
        }

        if (url.startsWith('/api/db/chat/') && req.method === 'DELETE') {
          const id = url.replace('/api/db/chat/', '');
          try {
            await deleteChatMessageDb(id);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
            return;
          } catch (err: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: err.message }));
            return;
          }
        }

        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), expressApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
