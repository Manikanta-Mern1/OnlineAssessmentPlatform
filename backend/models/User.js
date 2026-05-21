// File: models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // hash the password before storing it in MongoDB. If DB is hacked, Passwords are still safe.
const jwt = require('jsonwebtoken'); // to generate a JWT token after sucessful login. token in auth middleware to protect routes.

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    maxlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  examPermission: {
    type: Boolean, // true or false
    default: false,
  },
  profile: {
    address: {
      type: String,
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'], // Optional: restrict to specific values
    },
  }, // Nesting the profile schema
});

//Before any user document is saved to MongoDB, run this function. whenever User registers, password is updated this code runs automotically.
userSchema.pre('save', async function (next) { //Mongoose middleware(hook)
  if (!this.isModified('password')) { //if password is not changed skip hashing.
    return next();
  }
  const salt = await bcrypt.genSalt(10);//A salt is a random string generated for every single user.It is added to the password before it is hashed. if both users use the same password(no problem). 
  this.password = await bcrypt.hash(this.password, salt);// now password becomes encrypted
});

module.exports = mongoose.model('User', userSchema);
