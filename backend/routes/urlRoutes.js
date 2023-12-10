const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const ShortUrl = require('../models/shortUrl');

const router = express.Router();

// POST route for shortening URL
router.post('/shortUrls', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;

        // Create a new short URL entry in the database
        const newShortUrl = await ShortUrl.create({
            full: req.body.full,
            userId: userId,
        });

        res.json({ shortUrl: newShortUrl.short });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
