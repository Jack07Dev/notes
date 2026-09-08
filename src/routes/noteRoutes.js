const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Get all notes',
    });
});

router.post('/', (req, res) => {
    res.json({
        success: true,
        message: 'Create note',
        data: req.body,
    });
});


module.exports = router;