/**
 * Cấu hình API
 */
export const API_CONFIG = {
  BASE_URL: "http://localhost:1337/api",
  TIMEOUT: 10000, // 10 giây
  MAX_RETRIES: 3,
  CONTENT_TYPE: "application/json",
};

/**
 * Cấu hình Authentication
 */
export const AUTH_CONFIG = {
  TOKEN_KEY: "auth_token",
  REFRESH_TOKEN_KEY: "refresh_token",
  TOKEN_EXPIRY: 7 * 24 * 60 * 60 * 1000, // 7 ngày
};

/**
 * Cấu hình hệ thống
 */
export const APP_CONFIG = {
  SITE_NAME: "Comic App",
  DESCRIPTION: "Ứng dụng đọc truyện tranh",
  PAGINATION_LIMIT: 10,
  IMAGE_PLACEHOLDER: "/images/placeholder.png",
};
