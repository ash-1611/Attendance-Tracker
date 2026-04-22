const Attendance = require('../models/Attendance');

const normalizeDate = (value) => {
  const date = value ? new Date(value) : new Date();
  date.setUTCHours(0, 0, 0, 0);
  return date;
};

// @desc    Get all attendance records
// @route   GET /api/attendance
// @access  Private
exports.getAttendanceRecords = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, userId, startDate, endDate } = req.query;

    // Build filter
    const filter = {};

    // Authorization: Students can only see their own records
    if (req.user.role === 'STUDENT') {
      filter.userId = req.user.id;
    } else if (userId) {
      filter.userId = userId;
    }

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = normalizeDate(startDate);
      if (endDate) filter.date.$lte = normalizeDate(endDate);
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query
    const records = await Attendance.find(filter)
      .populate('userId', 'firstName lastName email')
      .populate('markedBy', 'firstName lastName')
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Attendance.countDocuments(filter);

    return res.status(200).json({
      success: true,
      count: records.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      records,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single attendance record
// @route   GET /api/attendance/:id
// @access  Private
exports.getAttendanceById = async (req, res, next) => {
  try {
    const record = await Attendance.findById(req.params.id)
      .populate('userId', 'firstName lastName email')
      .populate('markedBy', 'firstName lastName');

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found',
      });
    }

    // Authorization
    const ownerId = record.userId?._id ? record.userId._id.toString() : record.userId.toString();
    if (req.user.role === 'STUDENT' && ownerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this record',
      });
    }

    return res.status(200).json({
      success: true,
      record,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create attendance record
// @route   POST /api/attendance
// @route   POST /api/attendance/mark
// @access  Private
exports.createAttendance = async (req, res, next) => {
  try {
    if (req.user.role !== 'STUDENT') {
      return res.status(403).json({
        success: false,
        message: 'This app is configured for student self-tracking only',
      });
    }

    const {
      date,
      attendedLectures,
      totalLectures,
    } = req.body;

    const effectiveDate = normalizeDate(date);

    // Validation
    if (
      attendedLectures === undefined ||
      attendedLectures === null ||
      totalLectures === undefined ||
      totalLectures === null
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide attended lectures and total lectures',
      });
    }

    const parsedAttended = Number(attendedLectures);
    const parsedTotal = Number(totalLectures);

    if (Number.isNaN(parsedAttended) || Number.isNaN(parsedTotal)) {
      return res.status(400).json({
        success: false,
        message: 'Lecture counts must be valid numbers',
      });
    }

    if (parsedAttended < 0 || parsedTotal < 0) {
      return res.status(400).json({
        success: false,
        message: 'Lecture counts cannot be negative',
      });
    }

    if (parsedAttended > parsedTotal) {
      return res.status(400).json({
        success: false,
        message: 'Attended lectures cannot exceed total lectures',
      });
    }

    // Check if record already exists for this user/date
    const exists = await Attendance.findOne({
      userId: req.user.id,
      date: effectiveDate,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: 'Attendance record already exists for this date',
      });
    }

    const record = await Attendance.create({
      userId: req.user.id,
      date: effectiveDate,
      attendedLectures: parsedAttended,
      totalLectures: parsedTotal,
      markedBy: req.user.id,
    });

    return res.status(201).json({
      success: true,
      record,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update attendance record
// @route   PUT /api/attendance/:id
// @access  Private (STUDENT owner)
exports.updateAttendance = async (req, res, next) => {
  try {
    let record = await Attendance.findById(req.params.id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found',
      });
    }

    if (record.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own attendance records',
      });
    }

    const { attendedLectures, totalLectures, date } = req.body;

    if (attendedLectures !== undefined) record.attendedLectures = Number(attendedLectures);
    if (totalLectures !== undefined) record.totalLectures = Number(totalLectures);
    if (date) record.date = normalizeDate(date);

    record = await record.save();

    return res.status(200).json({
      success: true,
      record,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete attendance record
// @route   DELETE /api/attendance/:id
// @access  Private (STUDENT owner)
exports.deleteAttendance = async (req, res, next) => {
  try {
    const record = await Attendance.findById(req.params.id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found',
      });
    }

    if (record.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own attendance records',
      });
    }

    await Attendance.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: 'Attendance record deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get attendance analytics
// @route   GET /api/attendance/analytics/summary
// @access  Private
exports.getAnalytics = async (req, res, next) => {
  try {
    const { userId, startDate, endDate } = req.query;

    const filter = {};

    // Authorization
    if (req.user.role === 'STUDENT') {
      filter.userId = req.user.id;
    } else if (userId) {
      filter.userId = userId;
    }

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = normalizeDate(startDate);
      if (endDate) filter.date.$lte = normalizeDate(endDate);
    }

    // Get attendance records
    const records = await Attendance.find(filter);

    // Calculate statistics
    const totalRecords = records.length;
    const totalLectures = records.reduce((sum, record) => sum + (record.totalLectures || 0), 0);
    const attendedLectures = records.reduce(
      (sum, record) => sum + (record.attendedLectures || 0),
      0
    );
    const missedLectures = Math.max(totalLectures - attendedLectures, 0);
    const attendancePercentage =
      totalLectures > 0 ? (attendedLectures / totalLectures) * 100 : 0;

    return res.status(200).json({
      success: true,
      analytics: {
        totalRecords,
        attendedLectures,
        totalLectures,
        missedLectures,
        attendancePercentage: Math.round(attendancePercentage * 100) / 100,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get defaulters (low attendance students)
// @route   GET /api/attendance/defaulters
// @access  Private (TEACHER, ADMIN)
exports.getDefaulters = async (req, res, next) => {
  try {
      return res.status(200).json({
        success: true,
        defaulters: [],
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
