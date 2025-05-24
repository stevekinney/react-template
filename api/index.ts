import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { auth } from './auth/auth';
import { api } from './routes';

const app = new Hono();
const port = process.env['PORT'] || 3000;

export const runtime = 'edge';

if (import.meta.env.MODE === 'development') {
  // Enable CORS in development mode
  app.use('*', cors({ origin: '*' }));
}

// API routes
app.route('/api', api);

// Auth routes
app.route('/auth', auth);

// Health check
app.get('/', (c) => {
  return c.json({ message: 'Bun + Vite Full-Stack Server Running!' });
});

console.log(`🚀 Server running on http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
