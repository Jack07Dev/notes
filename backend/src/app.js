const express = require("express");
const cors = require("cors");

const noteRoutes = require("./routes/noteRoutes");
const noteModel = require("./models/note.model");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.use('/api/notes', noteRoutes);
app.post("/notes", async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = await noteModel.create({
      title,
      content,
    });
    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: newNote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating note",
      error: error.message,
    });
  }
});

app.get("/notes", async (req, res) => {
  try {
    const notes = await noteModel.find();
    res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching notes",
      error: error.message,
    });
  }
});

app.delete("/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const deletedNote = await noteModel.findByIdAndDelete(noteId);
    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      data: deletedNote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting note",
      error: error.message,
    });
  }
});

app.patch("/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const { title, content } = req.body;
    const updatedNote = await noteModel.findByIdAndUpdate(
      noteId,
      { title, content },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: updatedNote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating note",
      error: error.message,
    });
  }
});

module.exports = app;
