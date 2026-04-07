const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const contestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: ObjectId,
      ref: 'User',
      required: [true, 'Creator is required'],
    },
    startTime: {
      type: Date,
      required: [true, 'Start time is required'],
    },
    endTime: {
      type: Date,
      required: [true, 'End time is required'],
      validate: {
        validator: function(value) {
          return value > this.startTime;
        },
        message: 'End time must be after start time',
      },
    },
    examTime: {
      type: Number,
      required: [true, 'Exam time is required'],
      min: [1, 'Exam time must be at least 1 minute'],
      max: [480, 'Exam time cannot exceed 480 minutes'],
    },
    amountQuestion: {
      type: Number,
      required: [true, 'Amount of questions is required'],
      min: [1, 'Must have at least 1 question'],
      max: [200, 'Cannot exceed 200 questions'],
    },
    groupQuestion: {
      type: ObjectId,
      ref: 'Group Question',
      required: [true, 'Question group is required'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    password: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Contest', contestSchema);
