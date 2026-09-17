const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const noteRoutes = require("./routes/noteRoutes");
const authRouter = require('./routes/auth.route');

// Initialize Express app
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Notes API is running",
  });
});

// Use note routes
app.use("/api/auth", authRouter);
app.use("/api/notes", noteRoutes);

module.exports = app;
