const mongoose = require("mongoose");
require("dotenv").config();

// const mongoURL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/assessment-platform";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/assessment-platform", { //database is created automitacilly if not exists.
            useNewUrlParser: true, //Use the new, better way to talk to MongoDB instead of the old, outdated way
            useUnifiedTopology: true, //Use the new, stable engine to manage connection and reconnection automatically.
            serverSelectionTimeoutMS: 5000,//If MongoDB is not reachable, Mongoose will wait 5 seconds and then throw an error instead of hanging forever.
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;