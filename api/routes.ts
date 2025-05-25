import { Hono } from 'hono';
import { authenticated } from './middleware/authenticated';

export const api = new Hono();
export type APIRoutes = typeof api;

api.get('/check', (c) => {
  return c.json({ message: 'Hello from the API!' });
});

api.get('/protected', authenticated, (c) => {
  return c.json({ message: 'This is a protected route!' });
});
