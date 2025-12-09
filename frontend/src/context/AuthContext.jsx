import { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await authApi.login(email, password);
    localStorage.setItem('token', data.token);
    setUser({ token: data.token });
    return data;
  };

  const register = async (email, password) => {
    const data = await authApi.register(email, password);
    localStorage.setItem('token', data.token);
    setUser({ token: data.token });
    return data;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      // Ignore logout errors
    }
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
