const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Get all notes',
    });
});

router.post('/notes', (req, res) => {
    const { title, content } = req.body;
    res.json({
        success: true,
        message: 'Create note',
        data: { title, content },
    });
});


module.exports = router;