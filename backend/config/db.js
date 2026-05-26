const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
        throw new Error(
            "MONGO_URI is not set. Add it in Render → Environment."
        );
    }

    const maxRetries = 5;
    const retryDelayMs = 3000;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            await mongoose.connect(mongoURI);
            console.log("MongoDB connected successfully");
            return;
        } catch (error) {
            console.error(
                `MongoDB connection attempt ${attempt}/${maxRetries} failed:`,
                error.message
            );
            if (attempt === maxRetries) {
                throw error;
            }
            await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
        }
    }
};

module.exports = connectDB;
