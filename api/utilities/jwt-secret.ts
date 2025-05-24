export const getJwtSecret = (): string => {
  const JWT_SECRET = process.env['JWT_SECRET'];

  if (!JWT_SECRET) {
    throw new Error(
      'JWT_SECRET is not set. Please set it in your environment variables.',
    );
  }

  return JWT_SECRET;
};
