const express = require('express');
const { getAllStudents, deleteStudent, updateExamPermission, createActivity, getAllStudentActivities, createProctor, getProctorByUserId, updateRole } = require('../controllers/studentController');
const authenticate = require('../middlewares/auth');
const router = express.Router();

router.get('/', authenticate(), getAllStudents);
router.delete('/:id', authenticate(), deleteStudent);
router.put('/permission/:id', authenticate(), updateExamPermission);

//activity
router.post('/activity', authenticate(), createActivity);
router.get('/activity', authenticate(), getAllStudentActivities);

//role update
router.put('/role/:id', authenticate(), updateRole);

// proctor
router.post('/proctor', authenticate(), createProctor);
router.get('/proctor/:id', authenticate(), getProctorByUserId);

module.exports = router;
