const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    const mongoURI =
        process.env.MONGO_URI ||
        "mongodb://127.0.0.1:27017/assessment-platform";

    if (!process.env.MONGO_URI) {
        console.warn(
            "MONGO_URI is not set — using local fallback. Set MONGO_URI in Render → Environment."
        );
    }

    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
};

module.exports = connectDB;
