const API_URL = 'http://localhost:3000/api';

export const api = (relativePath: string, options: { method?: string, body?: any, } = {}) => {
  const baseUrl = 'http://localhost:3000/api/';
  return fetch(
    `${baseUrl}${relativePath}`,
    {
      headers: {
        ['Content-Type']: 'application/json'

      },
      ...options,
      credentials: "include"
    }
  );
}