const express = require('express');
const router = express.Router();

// @route   GET /api/playlists
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Playlists route'));

module.exports = router;