const BASE_URL = 'http://localhost:3000/api';

export const api = (relativePath: string, options: RequestInit = {}) => {
  const cleanPath = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;
  
  return fetch(`${BASE_URL}${cleanPath}`, {
    ...options,
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
};