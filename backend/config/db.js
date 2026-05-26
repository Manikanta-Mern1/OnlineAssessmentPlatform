const mongoose = require("mongoose");
require("dotenv").config();

const getMongoURI = () => {
    const uri = (
        process.env.MONGO_URI ||
        process.env.MONGO_URL ||
        "mongodb://127.0.0.1:27017/assessment-platform"
    ).trim();

    if (!process.env.MONGO_URI && !process.env.MONGO_URL) {
        console.warn(
            "MONGO_URI is not set — using local fallback. Set MONGO_URI in Render → Environment."
        );
    }

    return uri;
};

const logMongoTarget = (uri) => {
    const hostMatch = uri.match(/@([^/?]+)/);
    const host = hostMatch ? hostMatch[1] : "unknown";
    console.log(`Connecting to MongoDB host: ${host}`);
};

const connectDB = async () => {
    const mongoURI = getMongoURI();
    logMongoTarget(mongoURI);
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
};

module.exports = connectDB;
