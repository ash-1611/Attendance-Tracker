const mongoose = require('mongoose');

const classSchema = new mongoose.Schema(
  {
    classId: {
      type: String,
      required: [true, 'Class ID is required'],
      unique: true,
      trim: true,
    },
    className: {
      type: String,
      required: [true, 'Class name is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    schedule: {
      type: String, // e.g., "MWF 10:00-11:00"
      trim: true,
    },
    room: {
      type: String,
      trim: true,
    },
    department: {
      type: String,
      trim: true,
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

classSchema.index({ classId: 1 });
classSchema.index({ instructorId: 1 });

module.exports = mongoose.model('Class', classSchema);
