const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const questionSchema = new mongoose.Schema(
  {
    level: {
      type: String,
      required: [true, 'Level is required'],
      enum: {
        values: ['EASY', 'MEDIUM', 'HARD'],
        message: 'Level must be EASY, MEDIUM, or HARD',
      },
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [500, 'Title cannot exceed 500 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    explain: {
      type: String,
      trim: true,
    },
    answers: {
      type: [
        {
          answerId: {
            type: String,
            required: true,
          },
          position: {
            type: Number,
            required: true,
          },
          content: {
            type: String,
            required: true,
            trim: true,
          },
          isCorrect: {
            type: Boolean,
            default: false,
          },
        },
      ],
      validate: {
        validator: function(answers) {
          return answers.length >= 2 && answers.length <= 6;
        },
        message: 'Question must have between 2 and 6 answers',
      },
    },
    groupQuestion: {
      type: ObjectId,
      ref: 'Group Question',
      required: [true, 'Question group is required'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Validate at least one correct answer
questionSchema.pre('save', function(next) {
  const hasCorrectAnswer = this.answers.some(answer => answer.isCorrect);
  if (!hasCorrectAnswer) {
    next(new Error('Question must have at least one correct answer'));
  } else {
    next();
  }
});

module.exports = mongoose.model('Question', questionSchema);
