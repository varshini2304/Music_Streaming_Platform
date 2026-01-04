const express = require('express');
const router = express.Router();
const {
  searchSongs,
  searchKannadaSongs,
  getCoverArt,
  searchArtists
} = require('../musicbrainz');

/**
 * @route   GET /api/musicbrainz/search
 * @desc    Search for songs from MusicBrainz
 * @query   {string} q - Search query (song name, artist, album)
 * @returns {Array} Array of song objects with metadata
 */
router.get('/search', async (req, res) => {
  try {
    const query = req.query.q;

    if (!query || query.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Search query is required',
        data: []
      });
    }

    // Search for songs from MusicBrainz (real-time)
    const songs = await searchSongs(query);

    return res.status(200).json({
      success: true,
      message: `Found ${songs.length} songs matching "${query}"`,
      data: songs,
      count: songs.length,
      source: 'MusicBrainz'
    });
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error searching songs',
      error: error.message,
      data: []
    });
  }
});

/**
 * @route   GET /api/musicbrainz/kannada
 * @desc    Search for Kannada songs from MusicBrainz
 * @query   {string} q - Search query (Kannada song or artist name)
 * @returns {Array} Array of Kannada song objects
 */
router.get('/kannada', async (req, res) => {
  try {
    const query = req.query.q;

    if (!query || query.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Search query is required',
        data: []
      });
    }

    // Search for Kannada songs specifically
    const kannadaSongs = await searchKannadaSongs(query);

    return res.status(200).json({
      success: true,
      message: `Found ${kannadaSongs.length} Kannada songs matching "${query}"`,
      data: kannadaSongs,
      count: kannadaSongs.length,
      language: 'Kannada',
      source: 'MusicBrainz'
    });
  } catch (error) {
    console.error('Kannada search error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error searching Kannada songs',
      error: error.message,
      data: []
    });
  }
});

/**
 * @route   GET /api/musicbrainz/artists
 * @desc    Search for artists from MusicBrainz
 * @query   {string} q - Artist name
 * @returns {Array} Array of artist objects
 */
router.get('/artists', async (req, res) => {
  try {
    const artistName = req.query.q;

    if (!artistName || artistName.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Artist name is required',
        data: []
      });
    }

    const artists = await searchArtists(artistName);

    return res.status(200).json({
      success: true,
      message: `Found ${artists.length} artists matching "${artistName}"`,
      data: artists,
      count: artists.length,
      source: 'MusicBrainz'
    });
  } catch (error) {
    console.error('Artist search error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error searching artists',
      error: error.message,
      data: []
    });
  }
});

/**
 * @route   GET /api/musicbrainz/cover-art/:mbid
 * @desc    Get cover art for a song
 * @params  {string} mbid - MusicBrainz recording ID
 * @returns {Object} Cover art information
 */
router.get('/cover-art/:mbid', async (req, res) => {
  try {
    const { mbid } = req.params;

    if (!mbid) {
      return res.status(400).json({
        success: false,
        message: 'MusicBrainz ID is required'
      });
    }

    const coverArtUrl = await getCoverArt(mbid);

    return res.status(200).json({
      success: !!coverArtUrl,
      message: coverArtUrl ? 'Cover art found' : 'Cover art not found',
      data: {
        mbid,
        coverArt: coverArtUrl
      },
      source: 'CoverArtArchive'
    });
  } catch (error) {
    console.error('Cover art error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching cover art',
      error: error.message
    });
  }
});

module.exports = router;
