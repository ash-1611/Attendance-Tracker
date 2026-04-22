import api from './api';

const authService = {
  // Register new user
  register: async (firstName, lastName, email, password) => {
    try {
      const response = await api.post('/auth/register', {
        firstName,
        lastName,
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data.user;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update profile
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/auth/profile', userData);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data.user;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.post('/auth/change-password', {
        currentPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get stored user
  getStoredUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Get token
  getToken: () => {
    return localStorage.getItem('token');
  },
};

export default authService;
