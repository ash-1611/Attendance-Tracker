import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(authService.getStoredUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.login(email, password);
      setUser(data.user);
      return data;
    } catch (err) {
      const errorMessage = err.message || 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (firstName, lastName, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.register(firstName, lastName, email, password);
      setUser(data.user);
      return data;
    } catch (err) {
      const errorMessage = err.message || 'Registration failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setError(null);
  }, []);

  const updateProfile = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedUser = await authService.updateProfile(userData);
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      const errorMessage = err.message || 'Update failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const changePassword = useCallback(async (currentPassword, newPassword) => {
    setLoading(true);
    setError(null);
    try {
      const result = await authService.changePassword(currentPassword, newPassword);
      return result;
    } catch (err) {
      const errorMessage = err.message || 'Password change failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      register,
      logout,
      updateProfile,
      changePassword,
      isAuthenticated: !!user,
    }),
    [user, loading, error, login, register, logout, updateProfile, changePassword]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export default useAuth;
