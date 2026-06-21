// Centraliza la base URL de la API para todo el frontend
export const API_BASE = import.meta.env.VITE_API_URL || '';

// Construye una URL completa a partir de una ruta relativa
export function apiUrl(path = '') {
  const base = API_BASE || '';
  if (!base) return path;
  const trimmedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const trimmedPath = path.startsWith('/') ? path.slice(1) : path;
  return `${trimmedBase}/${trimmedPath}`;
}

export default {
  API_BASE,
  apiUrl,
};
