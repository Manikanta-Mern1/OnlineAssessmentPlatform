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

const app = express();

const allowedOrigins = [
    ...(process.env.CLIENT_URL || "")
        .split(",")
        .map((url) => url.trim())
        .filter(Boolean),
    "http://localhost:3000",
];

const isOriginAllowed = (origin) => {
    if (!origin) return true;
    if (allowedOrigins.includes(origin)) return true;
    // Netlify preview and production deploys
    if (/^https:\/\/[\w-]+\.netlify\.app$/.test(origin)) return true;
    return false;
};

app.use(
    cors({
        origin(origin, callback) {
            if (isOriginAllowed(origin)) {
                callback(null, true);
            } else {
                console.warn(`CORS blocked origin: ${origin}`);
                callback(null, false);
            }
        },
        credentials: true,
    })
);

app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

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

const startServer = () => {
    const nodeMajor = Number(process.version.slice(1).split(".")[0]);
    console.log(`Node ${process.version}`);
    console.log(`MONGO_URI set: ${Boolean(process.env.MONGO_URI)}`);
    if (nodeMajor > 20) {
        console.warn(
            "Warning: Use Node 20 on Render. Add environment variable NODE_VERSION=20"
        );
    }

    app.listen(PORT, () => {
        console.log(`Server running on the port ${PORT}`);
    });

    const connectWithRetry = async () => {
        const maxAttempts = 10;
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                await connectDB();
                return;
            } catch (error) {
                console.error(
                    `MongoDB attempt ${attempt}/${maxAttempts} failed:`,
                    error.message
                );
                if (attempt < maxAttempts) {
                    await new Promise((resolve) => setTimeout(resolve, 5000));
                }
            }
        }
        console.error(
            "Could not connect to MongoDB. Check MONGO_URI on Render and Atlas network access."
        );
    };

    connectWithRetry();
};

startServer();