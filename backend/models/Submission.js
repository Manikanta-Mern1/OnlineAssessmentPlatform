// models/Submission.js
const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming you have a User model
    answers: { type: Map, of: String, required: true }, // Stores the user's answers
    correctAnswers: { type: Number, required: true, default: 0 }, // Number of correct answers
    totalMarks: { type: Number, required: true, default: 0 }, // Marks scored
    totalQuestions: { type: Number, required: true, default: 0 },
    grade: { type: String }, // Grade based on marks
    warningCount: { type: Number, default: 0 },
    submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Submission', submissionSchema);
