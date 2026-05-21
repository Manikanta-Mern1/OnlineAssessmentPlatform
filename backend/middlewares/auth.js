const jwt = require('jsonwebtoken');

const authenticate = () => { //returns a middleware function used by express routes.
  return (req, res, next) => {

    const strToken = req.headers.authorization?.split(' ')[1];//Read token from headers
    //Frontend sends header like:Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    //Split by space → take 2nd part → actual token
    let token;
    if (strToken) {
      token = strToken.replace(/"/g, '');// Cleans token if quotes present.
    }
    
    if (!token) return res.status(401).json({ message: 'Unauthorized access' });
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ message: 'Invalid token' });
      req.user = decoded; // Assuming the token contains the user ID. Now every controller can use.
      next();//Moves to actual controller.
    });
  };
};

module.exports = authenticate;

//After login, frontend gets a token. But how does the backend know on the next request:
//Who is the user? Is the user logged in? Is the token valid? What is the user’s role?
//Without this file ❌ Anyone could call your APIs without login.
//With this file ✅ Only users with valid token can access protected APIs.