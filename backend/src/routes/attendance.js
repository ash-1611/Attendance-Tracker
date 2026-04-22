const express = require('express');
const {
  getAttendanceRecords,
  getAttendanceById,
  createAttendance,
  updateAttendance,
  deleteAttendance,
  getAnalytics,
  getDefaulters,
} = require('../controllers/attendanceController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Attendance records
router.get('/', getAttendanceRecords);
router.post('/mark', createAttendance);

// Analytics
router.get('/analytics/summary', getAnalytics);
router.get('/defaulters/list', getDefaulters);

// Single record routes
router.get('/:id', getAttendanceById);
router.put('/:id', updateAttendance);
router.delete('/:id', deleteAttendance);

module.exports = router;
