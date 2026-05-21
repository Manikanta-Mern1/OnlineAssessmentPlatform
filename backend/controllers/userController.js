const User = require('../models/User');
const bcrypt = require('bcryptjs');
const createToken = require('../utils/tokenUtils')// function that generates JWT

// Register a new user (Student or Admin)
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;// takes data from frontend
        //Hashing the Password
        const user = new User({ name, email, password, role });//create user document password still plain
        await user.save(); // pre('save') runs hook hashes the password automitically
        res.status(201).json({ user: { name, email, role }, message: "user successfully registed" });// 201 means created.This line back to the client
    } catch (err) {
        res.status(400).json({ error: err.message });//400 means unauthorized
    }
};

// Login user (Student or Admin)
exports.loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide an email and password' });
        }

        // Check if the user exists with the provided email
        const user = await User.findOne({ email }).select('+password');//+password telling to mongoose, whenever i fetch a user, do not include the password in the result by default
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Compare the provided password with the stored password
        const match = await bcrypt.compare(password, user.password);// don't decrypt password
        if (!match) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        const token = await createToken(user);
        res.status(200).json({ token, user: { name: user.name, email: user.email, role: user.role, id: user._id, examPermission: user.examPermission }, message: "user successfully login" });
        //frontend stores this token and sends in headers for protected routes.
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get user profile (Student or Admin)
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');//This uses Mongoose fetch a user from MongoDB
        //Frontend send token in headers. Middleware verifies token. req.user.userId = ID of logged-in user
        //Go to users collection and find the document whose _id equals this value
        //This tells Mongoose Fetch all fields EXCEPT password Minus (-) means exclude.
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update student profile :- This function updates a student’s profile using Express.js + Mongoose with data stored in MongoDB. 
exports.updateProfile = async (req, res) => {
    const { id } = req.params;//id is taken from the URL
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(403).json({ error: 'User not found' });
        }

        const { dob, address, gender } = req.body;
        user.profile.address = address;
        user.profile.dob = dob;
        user.profile.gender = gender;

        await user.save();
        res.json(user);//Sends updated user object to frontend as response
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Admin: Get all students
exports.getAllStudents = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Only admins can view all students' });
        }
        const students = await User.find({ role: 'student' }).select('-password');
        res.json(students);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Admin: Update student details
exports.updateStudent = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Only admins can update student details' });
        }

        const student = await User.findById(req.params.id);
        if (!student || student.role !== 'student') {
            return res.status(404).json({ error: 'Student not found' });
        }

        Object.assign(student.profile.studentDetails, req.body);//(target,source)
        await student.save();
        res.json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
