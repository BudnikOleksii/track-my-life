const JWT_SECRET_PLACEHOLDER = 'your-secret-key-change-me-in-production-min-32-chars';
const MIN_SECRET_LENGTH = 32;

const validateJwtSecret = () => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET environment variable is not set');
  }

  if (jwtSecret === JWT_SECRET_PLACEHOLDER) {
    throw new Error('JWT_SECRET is still the default placeholder — set a unique secret');
  }

  if (jwtSecret.length < MIN_SECRET_LENGTH) {
    throw new Error(`JWT_SECRET must be at least ${MIN_SECRET_LENGTH} characters long`);
  }
};

export const onRequestError = () => {};

export const register = () => {
  if (process.env.NODE_ENV === 'production') {
    validateJwtSecret();
  }
};
