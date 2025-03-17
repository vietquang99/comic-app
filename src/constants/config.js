export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  TIMEOUT: 10000,
};

export const AUTH_CONFIG = {
  TOKEN_KEY: 'authToken',
  USER_KEY: 'currentUser',
  TOKEN_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours
};

export const APP_CONFIG = {
  APP_NAME: 'Comic App',
  APP_DESCRIPTION: 'Ứng dụng đọc truyện tranh online',
  APP_VERSION: '1.0.0',
}; 