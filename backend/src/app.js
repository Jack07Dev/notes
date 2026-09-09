const express = require("express");
const cors = require("cors");

const noteRoutes = require("./routes/noteRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Notes API is running",
  });
});

app.use("/api/notes", noteRoutes);

module.exports = app;
