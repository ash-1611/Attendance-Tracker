import api from './api';

const attendanceService = {
  // Mark attendance for the current logged-in user (student)
  markToday: async (payload) => {
    try {
      const response = await api.post('/attendance/mark', payload);
      return response.data.record;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get attendance records
  getRecords: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      Object.keys(filters).forEach((key) => {
        if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
          params.append(key, filters[key]);
        }
      });
      const response = await api.get(`/attendance?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get single record
  getRecordById: async (id) => {
    try {
      const response = await api.get(`/attendance/${id}`);
      return response.data.record;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Create attendance record
  createRecord: async (attendanceData) => {
    try {
      const response = await api.post('/attendance', attendanceData);
      return response.data.record;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update attendance record
  updateRecord: async (id, attendanceData) => {
    try {
      const response = await api.put(`/attendance/${id}`, attendanceData);
      return response.data.record;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Delete attendance record
  deleteRecord: async (id) => {
    try {
      const response = await api.delete(`/attendance/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get analytics
  getAnalytics: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      Object.keys(filters).forEach((key) => {
        if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
          params.append(key, filters[key]);
        }
      });
      const response = await api.get(`/attendance/analytics/summary?${params.toString()}`);
      return response.data.analytics;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get defaulters
  getDefaulters: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      Object.keys(filters).forEach((key) => {
        if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
          params.append(key, filters[key]);
        }
      });
      const response = await api.get(`/attendance/defaulters/list?${params.toString()}`);
      return response.data.defaulters;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get dashboard stats
  getDashboardStats: async () => {
    try {
      const response = await api.get('/attendance/analytics/summary');
      return response.data.analytics;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default attendanceService;
