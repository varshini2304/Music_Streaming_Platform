const axios = require('axios');

const MUSICBRAINZ_API_BASE = 'https://musicbrainz.org/ws/2';
const USER_AGENT = 'MusicStreamingPlatform/1.0 (https://github.com/varshini2304/Music_Streaming_Platform)';

/**
 * Fetch songs from MusicBrainz API
 * @param {string} query - Song name, artist, or Kannada movie name
 * @returns {Promise<Array>} Array of song objects with metadata
 */
const searchSongs = async (query) => {
  try {
    if (!query || query.trim() === '') {
      return [];
    }

    // Search for recordings (songs) on MusicBrainz
    const recordingResponse = await axios.get(`${MUSICBRAINZ_API_BASE}/recording/`, {
      params: {
        query: `recording:${query}`,
        limit: 25,
        offset: 0,
        fmt: 'json'
      },
      headers: {
        'User-Agent': USER_AGENT
      },
      timeout: 10000
    });

    const recordings = recordingResponse.data.recordings || [];

    // Parse and format the results
    const songs = recordings.map((recording) => {
      const artists = recording['artist-credit'] || [];
      const artistName = artists
        .map((ac) => ac.artist.name)
        .join(' & ');

      const releases = recording.releases || [];
      let albumName = 'Unknown Album';
      let releaseYear = new Date().getFullYear().toString();
      let albumArt = null;

      if (releases.length > 0) {
        const primaryRelease = releases[0];
        albumName = primaryRelease.title || 'Unknown Album';
        if (primaryRelease['first-release-date']) {
          releaseYear = primaryRelease['first-release-date'].split('-')[0];
        }
      }

      return {
        id: recording.id,
        title: recording.title,
        artist: artistName || 'Unknown Artist',
        album: albumName,
        releaseYear: releaseYear,
        duration: recording.length ? Math.floor(recording.length / 1000) : 0,
        mbid: recording.id,
        // Placeholder URL - in real scenario, fetch from cover art archive
        url: `https://musicbrainz.org/recording/${recording.id}`,
        albumArt: 'https://via.placeholder.com/300x300?text=' + encodeURIComponent(albumName),
        source: 'MusicBrainz'
      };
    });

    return songs;
  } catch (error) {
    console.error('Error fetching songs from MusicBrainz:', error.message);
    return [];
  }
};

/**
 * Search for Kannada songs specifically
 * @param {string} query - Song or artist name
 * @returns {Promise<Array>} Array of Kannada song objects
 */
const searchKannadaSongs = async (query) => {
  try {
    if (!query || query.trim() === '') {
      return [];
    }

    // Search with Kannada language tag
    const response = await axios.get(`${MUSICBRAINZ_API_BASE}/recording/`, {
      params: {
        query: `recording:${query} AND lang:kn`,
        limit: 25,
        offset: 0,
        fmt: 'json'
      },
      headers: {
        'User-Agent': USER_AGENT
      },
      timeout: 10000
    });

    const recordings = response.data.recordings || [];

    const songs = recordings.map((recording) => {
      const artists = recording['artist-credit'] || [];
      const artistName = artists
        .map((ac) => ac.artist.name)
        .join(' & ');

      const releases = recording.releases || [];
      let albumName = 'Unknown Album';
      let releaseYear = new Date().getFullYear().toString();

      if (releases.length > 0) {
        const primaryRelease = releases[0];
        albumName = primaryRelease.title || 'Unknown Album';
        if (primaryRelease['first-release-date']) {
          releaseYear = primaryRelease['first-release-date'].split('-')[0];
        }
      }

      return {
        id: recording.id,
        title: recording.title,
        artist: artistName || 'Unknown Artist',
        album: albumName,
        releaseYear: releaseYear,
        duration: recording.length ? Math.floor(recording.length / 1000) : 0,
        mbid: recording.id,
        url: `https://musicbrainz.org/recording/${recording.id}`,
        albumArt: 'https://via.placeholder.com/300x300?text=' + encodeURIComponent(albumName),
        language: 'Kannada',
        source: 'MusicBrainz'
      };
    });

    return songs;
  } catch (error) {
    console.error('Error fetching Kannada songs from MusicBrainz:', error.message);
    return [];
  }
};

/**
 * Get cover art for a song
 * @param {string} mbid - MusicBrainz recording ID
 * @returns {Promise<string|null>} Cover art URL or null
 */
const getCoverArt = async (mbid) => {
  try {
    if (!mbid) return null;

    const response = await axios.get(
      `https://coverartarchive.org/recording/${mbid}`,
      { headers: { 'User-Agent': USER_AGENT }, timeout: 5000 }
    );

    if (response.data && response.data.images && response.data.images.length > 0) {
      return response.data.images[0].image;
    }
    return null;
  } catch (error) {
    console.error('Error fetching cover art:', error.message);
    return null;
  }
};

/**
 * Get artist information from MusicBrainz
 * @param {string} artistName - Artist name to search
 * @returns {Promise<Array>} Array of artist objects
 */
const searchArtists = async (artistName) => {
  try {
    if (!artistName || artistName.trim() === '') {
      return [];
    }

    const response = await axios.get(`${MUSICBRAINZ_API_BASE}/artist/`, {
      params: {
        query: `artist:${artistName}`,
        limit: 10,
        offset: 0,
        fmt: 'json'
      },
      headers: {
        'User-Agent': USER_AGENT
      },
      timeout: 10000
    });

    const artists = response.data.artists || [];

    return artists.map((artist) => ({
      id: artist.id,
      name: artist.name,
      country: artist.country || 'Unknown',
      type: artist.type || 'Person',
      mbid: artist.id,
      source: 'MusicBrainz'
    }));
  } catch (error) {
    console.error('Error fetching artists from MusicBrainz:', error.message);
    return [];
  }
};

module.exports = {
  searchSongs,
  searchKannadaSongs,
  getCoverArt,
  searchArtists
};
