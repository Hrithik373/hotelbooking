import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"; // Import CORS middleware
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/user.js";
import hotelsRoute from "./routes/hotels.js";
import cookieParser from "cookie-parser";
import roomsRoute from "./routes/room.js";

const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_ENV);
        console.log("Connected to Mongo");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB Disconnected !");
});
mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected !");
});

// Middleware connection of URL endpoints using authRoute
app.use(cors()); // Enable CORS for all routes
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
    console.error(err); // Log the error
    return res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

app.listen(8800, () => {
    connect();
    console.log("Connected to backend.");
});


//#FCKING CORS ISSSUE AHHHHH 