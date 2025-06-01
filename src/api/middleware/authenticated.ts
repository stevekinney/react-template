import { createClient, type User } from '@supabase/supabase-js';
import { getCookie } from 'hono/cookie';
import { createMiddleware } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';
import { env } from '@shared/environment';

const supabase = createClient(env.supabase.url, env.supabase.anonKey);

/**
 * Middleware to check if the user is authenticated.
 * It checks for a Bearer token in the Authorization header or a token cookie.
 * If the token is valid, it sets the user and token in the context.
 * If the token is invalid or expired, it throws a 401 error.
 * If the token is missing, it throws a 401 error.
 * If there is an error with the authentication service, it throws a 500 error.
 */
export const authenticated = createMiddleware<{
  Variables: {
    user: User;
    token: string;
  };
}>(async (c, next) => {
  let token: string | undefined;

  const authorizationHeader = c.req.header('Authorization');

  if (authorizationHeader?.startsWith('Bearer ')) {
    token = authorizationHeader.slice(7);
  } else {
    token = getCookie(c, 'token');
  }

  console.log('Token:', token);

  if (!token) {
    throw new HTTPException(401, {
      message:
        'Authorization header with Bearer token or token cookie required',
    });
  }

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      throw new HTTPException(401, {
        message: 'Invalid or expired token',
      });
    }

    c.set('user', user);
    c.set('token', token);

    await next();
  } catch (error) {
    if (error instanceof HTTPException) {
      throw error;
    }

    throw new HTTPException(500, {
      message: 'Authentication service error',
    });
  }
});
