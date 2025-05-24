import { Hono } from 'hono';

export const api = new Hono();
export type APIRoutes = typeof api;

api.get('/check', (c) => {
  return c.json({ message: 'Hello from the API!' });
});
