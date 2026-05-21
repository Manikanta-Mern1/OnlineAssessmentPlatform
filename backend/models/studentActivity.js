const mongoose = require('mongoose');

// Define Student Activity Schema
const studentActivitySchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    examId: {
        type: String,
        required: true
    },
    exam: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    acivityType: {
        type: String,
        required: true
    },
    examPermission: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create Student Activity Model
const StudentActivity = mongoose.model('StudentActivity', studentActivitySchema);

module.exports = StudentActivity;
