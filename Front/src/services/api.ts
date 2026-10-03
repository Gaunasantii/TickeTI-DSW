const baseUrl = import.meta.env.VITE_API_URL;

export const api = (relativePath: string, options: RequestInit = {}) => {
  const cleanPath = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;

  return fetch(`${baseUrl}${cleanPath}`, {
    ...options,
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
};