const express = require("express");

//Routers import your route modules into server.js so the app knows which file should handle which API requests in your Express.js backend.
const userRoutes = require('./routers/userRoute');
const examRouter = require("./routers/examRoute")
const studenRoutes = require('./routers/studentRoutes');
const questionRoute = require('./routers/quetionRoute');
const resultRoute = require('./routers/resultsRoute');

const cors = require("cors");

//import DB a function from config/db.js. That file contains the code to connect to MongoDB.
const connectDB = require("./config/db");

//body parser
const bodyParser = require("body-parser");//body-parser is middleware used in an Express.js app to read data sent from the frontend in the HTTP request body and convert it into req.body.

//env config
require("dotenv").config();

connectDB();//Your backend connects to MongoDB before handling any requests.

const app = express();
app.use(cors()); // This tells the server requests coming from other origins to access these APIs.

//parsing incoming JSON request
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));//It controls how complex form data is parsed into req.body.
//For any request starting with this URL, go to that router file
app.use('/api/auth', userRoutes);

//exams
app.use('/api/exam', examRouter);

//questions
app.use('/api/questions', questionRoute)

//students
app.use('/api/students', studenRoutes);

//result
app.use('/api/result', resultRoute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on the port ${PORT}`);
})

//sequence:-
//load env--> call connectDB()-->DB connectd-->start express server-->now routes can safely use DB.