const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    const mongoURI =
        process.env.MONGO_URI || "mongodb://127.0.0.1:27017/assessment-platform";

    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
