import { Hono } from 'hono';

export const api = new Hono();

api.get('/check', (c) => {
  return c.json({ message: 'Hello from the API!' });
});
