const baseUrl = import.meta.env.VITE_API_URL + '/';

export const api = (relativePath: string, options: { method?: string, body?: any, } = {}) => {
  return fetch(
    `${baseUrl}${relativePath}`,
    {
      ...options,
      headers: {
        ['Content-Type']: 'application/json'
      },
      credentials: "include"
    }
  );
}