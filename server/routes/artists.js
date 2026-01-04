const express = require('express');
const router = express.Router();

// @route   GET /api/artists
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Artists route'));

module.exports = router;