import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const AuthContext = createContext();
const TOKEN_KEY = 'martita_admin_token';

const readStoredToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

const persistToken = (nextToken) => {
  try {
    if (nextToken) {
      localStorage.setItem(TOKEN_KEY, nextToken);
      return;
    }

    localStorage.removeItem(TOKEN_KEY);
  } catch {
    // Ignoramos errores de storage para no romper la experiencia
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => readStoredToken());

  const login = useCallback((newToken) => {
    persistToken(newToken);
    setToken(newToken);
  }, []);

  const logout = useCallback(() => {
    persistToken(null);
    setToken(null);
  }, []);

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
