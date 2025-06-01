import { Hono } from 'hono';
import { authenticated } from './middleware/authenticated';

export const api = new Hono()
  .get('/check', (c) => {
    return c.json({
      message: 'Hello from the API!',
      timestamp: new Date().toISOString(),
    });
  })
  .get('/protected', authenticated, (c) => {
    const user = c.get('user');
    return c.json({
      message: 'This is a protected route!',
      user: {
        id: user.id,
        email: user.email,
      },
    });
  });

export type APIRoutes = typeof api;
