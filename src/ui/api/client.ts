import { hc } from 'hono/client';
import type { APIRoutes } from '@api/routes';

// Create the RPC client with type safety
export const apiClient = hc<APIRoutes>('/api');

// Custom error class for API errors
export class APIError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// Helper function for making authenticated requests
export const makeAuthenticatedRequest = async <T>(
  requestFn: () => Promise<Response>,
): Promise<T> => {
  const response = await requestFn();

  if (!response.ok) {
    const errorText = await response.text();
    throw new APIError(response.status, errorText);
  }

  return response.json();
};

// Typed API methods
export const api = {
  check: () => apiClient.check.$get(),
  protected: () => apiClient.protected.$get(),
} as const;
