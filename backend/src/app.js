const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const noteRoutes = require("./routes/note.route");
const authRoutes = require('./routes/auth.route');
const historyRoutes = require("./routes/history.route");
const adminRoutes = require("./routes/admin.route");
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
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;
