const express = require('express');

const {
    getNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote,
} = require('../controllers/noteController');
const { authUser } = require("../middlewares/auth.middleware");

// Create a router
const router = express.Router();

// Define routes for notes
router.get('/', authUser, getNotes);
router.get('/:id', authUser, getNote);
router.post('/', authUser, createNote);
router.put('/:id', authUser, updateNote);
router.delete('/:id', authUser, deleteNote);

module.exports = router;