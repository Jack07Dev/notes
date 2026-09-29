const noteService = require("../services/note.service");
const historyService = require("../services/history.service");

const getNotes = async (req, res, next) => {
  try {
    const notes = await noteService.getAllNotes(req.user.id, req.user.role);
    res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (error) {
    next(error);
  }
};

const getNote = async (req, res, next) => {
  try {
    const note = await noteService.getNoteById(
      req.params.id,
      req.user.id,
      req.user.role,
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

const createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const note = await noteService.createNote({
      title,
      content,
      user: req.user.id,
    });

    await historyService.logHistory({
      user: req.user.id,
      action: "created",
      noteId: note._id,
      noteTitle: note.title,
    });

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

const updateNote = async (req, res, next) => {
  try {
    const note = await noteService.updateNote(
      req.params.id,
      req.body,
      req.user.id,
      req.user.role,
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    await historyService.logHistory({
      user: req.user.id,
      action: "updated",
      noteId: note._id,
      noteTitle: note.title,
    });

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const note = await noteService.deleteNote(
      req.params.id,
      req.user._id,
      req.user.role,
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    await historyService.logHistory({
      user: req.user.id,
      action: "deleted",
      noteId: note._id,
      noteTitle: note.title,
    });

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
};
