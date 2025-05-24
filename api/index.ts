import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { api } from './routes';

const app = new Hono();

// Enable CORS for frontend
app.use(
  '*',
  cors({
    origin: 'http://localhost:5173', // Vite's default port
    credentials: true,
  }),
);

// API routes
app.route('/api', api);

// Health check
app.get('/', (c) => {
  return c.json({ message: 'Bun + Vite Full-Stack Server Running!' });
});

const port = process.env['PORT'] || 3000;

console.log(`🚀 Server running on http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
