const express = require('express');
const { registerUser, loginUser, getProfile, getAllStudents, updateStudent, updateProfile } = require('../controllers/userController');
const authenticate = require('../middlewares/auth');//This protects routes by checking JWT.

const router = express.Router();//Creates a mini route handler.

// Common routes no login required
router.post('/register', registerUser);
router.post('/login', loginUser);
//profile login required
router.get('/profile/:id', authenticate(), getProfile);
router.put('/profile/:id', authenticate(), updateProfile);

// Admin routes
router.get('/admin/students', authenticate('admin'), getAllStudents);
router.put('/admin/student/:id', authenticate('admin'), updateStudent);

module.exports = router;

//this file only defines paths and which controller function should run.
//This file defines user-related routes in your Express.js backend and connects them to controller functions and the auth middleware.