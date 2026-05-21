//You put this code in tokenUtils.js to centralize JWT logic using jsonwebtoken in your Express.js app.
//allows me to manage token configuration like payload and expiry from a single place.
const jwt = require('jsonwebtoken');
require('dotenv').config();
//to load environment variables from a .env file into process.env in your Node.js app.

const createToken = (user) => { //Defines a function named createToken. Takes a user object (from DB after login).
  try {
    const token = jwt.sign( //to generate a JWT
      { userId: user._id, role: user.role },  // Payload: userId and role.This data is stored inside the token.This payload can be decoded later by middleware.
      process.env.JWT_SECRET,                 // Secret from the environment variable. Prevents tampering. Comes from .env (not hardcoded).
      { expiresIn: process.env.JWT_EXPIRE }   // Token expiration time. Sets how long the token is valid (e.g., 1d, 2h). After this time, user must login again.
    );
    return token;//Will return a token string
  } catch (error) {
    console.error("Error creating token:", error);
    throw new Error("Token creation failed");
  }
};

module.exports = createToken;


//this token is used for
//Sent to frontend after login -> Frontend stores it ->Frontend sends it in headers for protected APIs.
//Auth middleware verifies it and extracts userId and role.