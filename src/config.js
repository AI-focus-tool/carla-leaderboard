// Centralized configuration
// Use empty string to make API calls relative to the current domain
// This allows Nginx to proxy the requests to the backend
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';
