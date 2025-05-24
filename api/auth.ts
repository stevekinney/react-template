import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { deleteCookie, setCookie } from 'hono/cookie';
import { jwt, sign } from 'hono/jwt';
import { z } from 'zod';

// In-memory data store
interface User {
  id: string;
  email: string;
  password: string; // In production, this should be hashed
  createdAt: Date;
}

const users = new Map<string, User>();
const sessions = new Map<string, string>(); // token -> userId

// JWT secret - in production, use environment variable
const JWT_SECRET = 'your-secret-key-change-in-production';

// Schemas
const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Create auth router
export const auth = new Hono();

// Signup endpoint - create new user
auth.post('/signup', zValidator('json', signupSchema), async (c) => {
  const { email, password } = c.req.valid('json');

  // Check if user already exists
  const existingUser = Array.from(users.values()).find(
    (u) => u.email === email,
  );
  if (existingUser) {
    return c.json({ error: 'User already exists' }, 400);
  }

  // Create new user
  const userId = crypto.randomUUID();
  const newUser: User = {
    id: userId,
    email,
    password, // In production, hash this password
    createdAt: new Date(),
  };

  users.set(userId, newUser);

  // Create JWT token
  const payload = {
    sub: userId,
    email: email,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
  };

  const token = await sign(payload, JWT_SECRET);
  sessions.set(token, userId);

  // Set cookie
  setCookie(c, 'auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return c.json({
    user: {
      id: userId,
      email: email,
    },
    token,
  });
});

// Login endpoint
auth.post('/login', zValidator('json', loginSchema), async (c) => {
  const { email, password } = c.req.valid('json');

  // Find user by email
  const user = Array.from(users.values()).find((u) => u.email === email);
  if (!user || user.password !== password) {
    return c.json({ error: 'Invalid credentials' }, 401);
  }

  // Create JWT token
  const payload = {
    sub: user.id,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
  };

  const token = await sign(payload, JWT_SECRET);
  sessions.set(token, user.id);

  // Set cookie
  setCookie(c, 'auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return c.json({
    user: {
      id: user.id,
      email: user.email,
    },
    token,
  });
});

// Logout endpoint
auth.post(
  '/logout',
  jwt({ secret: JWT_SECRET, cookie: 'auth-token' }),
  async (c) => {
    const payload = c.get('jwtPayload');

    // Remove session
    const authHeader = c.req.header('Authorization');
    const token =
      authHeader?.replace('Bearer ', '') || c.req.cookie('auth-token');

    if (token) {
      sessions.delete(token);
    }

    // Delete cookie
    deleteCookie(c, 'auth-token');

    return c.json({ message: 'Logged out successfully' });
  },
);

// Get current user
auth.get(
  '/me',
  jwt({ secret: JWT_SECRET, cookie: 'auth-token' }),
  async (c) => {
    const payload = c.get('jwtPayload');
    const userId = payload.sub as string;

    const user = users.get(userId);
    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }

    return c.json({
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  },
);

// Delete account endpoint
auth.delete(
  '/account',
  jwt({ secret: JWT_SECRET, cookie: 'auth-token' }),
  async (c) => {
    const payload = c.get('jwtPayload');
    const userId = payload.sub as string;

    // Delete user
    const user = users.get(userId);
    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }

    users.delete(userId);

    // Remove all sessions for this user
    for (const [token, sessionUserId] of sessions.entries()) {
      if (sessionUserId === userId) {
        sessions.delete(token);
      }
    }

    // Delete cookie
    deleteCookie(c, 'auth-token');

    return c.json({ message: 'Account deleted successfully' });
  },
);

// Debug endpoint to list all users (remove in production)
auth.get('/debug/users', (c) => {
  if (process.env.NODE_ENV === 'production') {
    return c.json({ error: 'Not available in production' }, 403);
  }

  const userList = Array.from(users.values()).map((u) => ({
    id: u.id,
    email: u.email,
    createdAt: u.createdAt,
  }));

  return c.json({
    users: userList,
    count: userList.length,
  });
});
