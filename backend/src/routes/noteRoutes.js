const express = require('express');
const router = express.Router();

router.post('/notes', (req, res) => {
    const { title, content } = req.body;
    res.status(201).json({
        success: true,
        message: 'Create note',
        data: { title, content },
    });
});

router.get('/notes', async (req, res) => {
    try {
        const notes = await noteModel.find();
        res.status(200).json({
            success: true,
            message: 'Notes fetched successfully',
            notes: notes,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching notes',
            error: error.message,
        });
    }
});

module.exports = router;