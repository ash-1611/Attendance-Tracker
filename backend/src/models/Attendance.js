const mongoose = require('mongoose');

/**
 * Daily lecture attendance (no subjects).
 * One document per user per calendar day.
 */
const attendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    attendedLectures: {
      type: Number,
      required: [true, 'Attended lectures is required'],
      min: [0, 'Attended lectures cannot be negative'],
    },
    totalLectures: {
      type: Number,
      required: [true, 'Total lectures is required'],
      min: [0, 'Total lectures cannot be negative'],
    },
    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

attendanceSchema.pre('validate', function (next) {
  if (this.totalLectures < this.attendedLectures) {
    this.invalidate('attendedLectures', 'Attended lectures cannot exceed total lectures');
  }
  next();
});

// One entry per user per day (normalized date stored at UTC midnight)
attendanceSchema.index({ userId: 1, date: 1 }, { unique: true });
attendanceSchema.index({ userId: 1, date: -1 });

attendanceSchema.virtual('dayPercentage').get(function () {
  if (!this.totalLectures) return 0;
  return Math.round((this.attendedLectures / this.totalLectures) * 100);
});

module.exports = mongoose.model('Attendance', attendanceSchema);
