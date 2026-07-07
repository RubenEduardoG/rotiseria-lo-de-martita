const DEFAULT_API_BASE = 'https://rotiseria-lo-de-martita-1.onrender.com';

const normalizeBaseUrl = (baseUrl = '') => {
  if (!baseUrl) return '';
  return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
};

// Centraliza la base URL de la API para todo el frontend
export const API_BASE = normalizeBaseUrl(import.meta.env.VITE_API_URL || DEFAULT_API_BASE);

// Construye una URL completa a partir de una ruta relativa
export function apiUrl(path = '') {
  const base = API_BASE || '';
  if (!base) return path;

  const trimmedPath = path.startsWith('/') ? path.slice(1) : path;
  return trimmedPath ? `${base}/${trimmedPath}` : base;
}

export default {
  API_BASE,
  apiUrl,
};