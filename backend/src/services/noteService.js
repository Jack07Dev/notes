const Note = require("../models/Note");

const getAllNotes = async () => {
  return await Note.find().sort({ createdAt: -1 });
};

const getNoteById = async (id) => {
  return await Note.findById(id);
};

const createNote = async (noteData) => {
  return await Note.create(noteData);
};

const updateNote = async (id, noteData) => {
  return await Note.findByIdAndUpdate(id, noteData, {
    new: true,
    runValidators: true,
  });
};

const deleteNote = async (id) => {
  return await Note.findByIdAndDelete(id);
};

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};
