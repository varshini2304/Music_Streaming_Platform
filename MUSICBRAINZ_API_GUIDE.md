# MusicBrainz API Integration Guide

## Overview
This Music Streaming Platform now integrates with **MusicBrainz**, a free and open music database, to fetch real-time music metadata. This enables searching for songs, artists, albums, and Kannada music with accurate information including:

- Song name and artist
- Album/Movie information
- Release year and duration
- Cover artwork from the Cover Art Archive
- Kannada language-specific searches

## Why MusicBrainz?

✅ **Free & Open**: No API key required, completely free to use
✅ **Accurate Indian Music Data**: Contains Kannada songs, artists, albums, and movie soundtracks
✅ **Rich Metadata**: Detailed information about songs, artists, and releases
✅ **No Rate Limiting Issues**: Reasonable rate limits for development and production
✅ **Reliable**: Used by major music platforms worldwide

## Architecture

### Backend Files Created

#### 1. `server/musicbrainz.js` - Service Module
Contains core functions to interact with MusicBrainz API:

```javascript
// Search for songs (English and other languages)
searchSongs(query) → Promise<Array>

// Search specifically for Kannada songs
searchKannadaSongs(query) → Promise<Array>

// Fetch cover art from Cover Art Archive
getCoverArt(mbid) → Promise<string|null>

// Search for artists
searchArtists(artistName) → Promise<Array>
```

#### 2. `server/routes/musicbrainz.js` - API Routes
Expose the MusicBrainz functionality through Express REST endpoints:

```
GET /api/musicbrainz/search?q=query
GET /api/musicbrainz/kannada?q=query
GET /api/musicbrainz/artists?q=query
GET /api/musicbrainz/cover-art/:mbid
```

## API Endpoints

### 1. General Song Search
**Endpoint**: `GET /api/musicbrainz/search`

**Query Parameters**:
- `q` (required): Search query (song name, artist name, or album)

**Example**:
```bash
GET /api/musicbrainz/search?q=Blinding%20Lights
```

**Response**:
```json
{
  "success": true,
  "message": "Found 15 songs matching \"Blinding Lights\"",
  "data": [
    {
      "id": "recording-id",
      "title": "Blinding Lights",
      "artist": "The Weeknd",
      "album": "After Hours",
      "releaseYear": "2019",
      "duration": 200,
      "mbid": "musicbrainz-id",
      "url": "https://musicbrainz.org/recording/...",
      "albumArt": "https://via.placeholder.com/300x300?text=After%20Hours",
      "source": "MusicBrainz"
    }
  ],
  "count": 15,
  "source": "MusicBrainz"
}
```

### 2. Kannada Song Search
**Endpoint**: `GET /api/musicbrainz/kannada`

**Query Parameters**:
- `q` (required): Search query in Kannada or English

**Example**:
```bash
GET /api/musicbrainz/kannada?q=Belageddu
```

**Response**:
```json
{
  "success": true,
  "message": "Found 8 Kannada songs matching \"Belageddu\"",
  "data": [
    {
      "id": "recording-id",
      "title": "Belageddu",
      "artist": "Kannada Artist Name",
      "album": "Kannada Album",
      "releaseYear": "2020",
      "duration": 180,
      "mbid": "musicbrainz-id",
      "url": "https://musicbrainz.org/recording/...",
      "albumArt": "https://via.placeholder.com/300x300?text=Kannada%20Album",
      "language": "Kannada",
      "source": "MusicBrainz"
    }
  ],
  "count": 8,
  "language": "Kannada",
  "source": "MusicBrainz"
}
```

### 3. Artist Search
**Endpoint**: `GET /api/musicbrainz/artists`

**Query Parameters**:
- `q` (required): Artist name

**Example**:
```bash
GET /api/musicbrainz/artists?q=AR%20Rahman
```

**Response**:
```json
{
  "success": true,
  "message": "Found 5 artists matching \"AR Rahman\"",
  "data": [
    {
      "id": "artist-id",
      "name": "A. R. Rahman",
      "country": "IN",
      "type": "Person",
      "mbid": "musicbrainz-id",
      "source": "MusicBrainz"
    }
  ],
  "count": 5,
  "source": "MusicBrainz"
}
```

### 4. Cover Art Retrieval
**Endpoint**: `GET /api/musicbrainz/cover-art/:mbid`

**URL Parameters**:
- `mbid` (required): MusicBrainz recording ID

**Example**:
```bash
GET /api/musicbrainz/cover-art/abc123def456
```

**Response**:
```json
{
  "success": true,
  "message": "Cover art found",
  "data": {
    "mbid": "abc123def456",
    "coverArt": "https://coverartarchive.org/release/.../front.jpg"
  },
  "source": "CoverArtArchive"
}
```

## Real-Time Data Fetching

The API fetches live data from MusicBrainz on every request, ensuring:

✅ Always up-to-date music information
✅ Latest artist and album data
✅ Current release information
✅ No stale or cached data

**Note**: Each search query makes a real-time API call to MusicBrainz. Response time is typically 200-500ms depending on network and query complexity.

## Metadata Fields Extracted

For each song, the following metadata is extracted from MusicBrainz:

| Field | Source | Description |
|-------|--------|-------------|
| `title` | Recording title | Song/track name |
| `artist` | Artist credit | Artist name (supports collaborations) |
| `album` | Release title | Album or compilation name |
| `releaseYear` | First release date | Year the song was first released |
| `duration` | Recording length | Duration in seconds |
| `mbid` | Recording ID | Unique MusicBrainz identifier |
| `language` | Recording language | Language code (e.g., 'kn' for Kannada) |

## Sample Requests

### JavaScript/Fetch API

```javascript
// Search for a song
const searchSong = async (query) => {
  const response = await fetch(`/api/musicbrainz/search?q=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.data; // Array of songs
};

// Search for Kannada songs
const searchKannada = async (query) => {
  const response = await fetch(`/api/musicbrainz/kannada?q=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.data; // Array of Kannada songs
};

// Get cover art
const getCoverArt = async (mbid) => {
  const response = await fetch(`/api/musicbrainz/cover-art/${mbid}`);
  const data = await response.json();
  return data.data.coverArt; // Cover art URL
};
```

### cURL

```bash
# Search for songs
curl "http://localhost:5000/api/musicbrainz/search?q=Blinding%20Lights"

# Search for Kannada songs
curl "http://localhost:5000/api/musicbrainz/kannada?q=Belageddu"

# Search for artists
curl "http://localhost:5000/api/musicbrainz/artists?q=AR%20Rahman"

# Get cover art
curl "http://localhost:5000/api/musicbrainz/cover-art/abc123def456"
```

## Error Handling

All endpoints include comprehensive error handling:

**Missing Query Parameter**:
```json
{
  "success": false,
  "message": "Search query is required",
  "data": []
}
```

**API Error**:
```json
{
  "success": false,
  "message": "Error searching songs",
  "error": "Connection timeout",
  "data": []
}
```

## Performance Considerations

1. **Response Time**: 200-500ms per request (MusicBrainz API)
2. **Rate Limiting**: 1 request per second per IP (MusicBrainz policy)
3. **Caching**: Consider implementing Redis caching for frequent searches
4. **User-Agent**: Custom user-agent required for MusicBrainz API

## Integration with Frontend

To use MusicBrainz data in the React frontend, update the Search component:

```javascript
const handleSearch = async (query) => {
  const response = await fetch(`/api/musicbrainz/search?q=${query}`);
  const { data } = await response.json();
  setSearchResults(data);
};
```

## Limitations & Future Improvements

### Current Limitations
- No direct audio streaming (URLs point to MusicBrainz pages)
- Cover art may not be available for all songs
- Language detection is basic

### Future Enhancements
1. Add response caching to reduce API calls
2. Integrate with Spotify or Last.fm for audio streaming
3. Implement advanced Kannada song filtering
4. Add batch search functionality
5. Create admin interface for managing cached data

## Testing

To test the MusicBrainz integration:

```bash
# Start the backend server
cd server
npm start

# Test the endpoints
curl "http://localhost:5000/api/musicbrainz/search?q=Levitating"
curl "http://localhost:5000/api/musicbrainz/kannada?q=Kannada%20song"
```

## Resources

- [MusicBrainz API Documentation](https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2)
- [Cover Art Archive API](https://coverartarchive.org/)
- [MusicBrainz Database](https://musicbrainz.org/)

## Support

For issues or feature requests related to MusicBrainz integration, please create an issue on GitHub.
