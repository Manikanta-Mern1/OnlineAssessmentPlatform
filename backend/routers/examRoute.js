const express = require('express');
const authenticate = require('../middlewares/auth');
const { createExam, getExams, deleteExam, updateExam, getExamById, submitExam, getUserSubmissions } = require('../controllers/examController');

const router = express.Router();

// Common routes
router.post('/exams', authenticate(), createExam);
router.get('/', authenticate(), getExams);
router.get('/exams/:id', authenticate(), getExamById);
router.put('/exams/:id', authenticate(), updateExam);
router.delete('/exams/:id', authenticate(), deleteExam);

//exam submit
router.post('/submit', authenticate(), submitExam);
router.get('/submit', authenticate(), getUserSubmissions);

module.exports = router;
