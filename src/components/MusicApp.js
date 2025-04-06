// components/MusicApp.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineSearch } from 'react-icons/ai';
import './MusicApp.css';
import { Link } from 'react-router-dom';

const syncloop_api = 'https://cloud.syncloop.com/tenant/AdityaPradhan/public/packages.UltimateEntertainmentHub.APIs.iTunes.main';
const bearerToken = process.env.REACT_APP_BEARER_TOKEN; // Load environment variable

const MusicApp = () => {
  const [songs, setSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch top 20 songs
  const fetchTopSongs = async () => {
    try {
      const response = await axios.get(
        `${syncloop_api}`
      );
      const topSongs = response.data.topSongs.map((entry) => ({
        id: entry.id.attributes['im:id'],
        title: entry['im:name'].label,
        titleUrl: entry.link[0]?.attributes?.href || '#', // URL for the song title
        artist: entry['im:artist'].label,
        artistUrl: entry['im:artist']?.attributes?.href || '#', // URL for the artist
        album: entry['im:collection']?.['im:name']?.label || 'Single',
        albumUrl: entry['im:collection']?.link?.attributes?.href || '#', // URL for the album
        artwork: entry['im:image'][2].label, // Use the largest image (170x170)
        previewUrl: entry.link[1]?.attributes?.href || '', // Preview URL
      }));
      setSongs(topSongs);
    } catch (error) {
      console.error('Error fetching top songs:', error);
    }
  };

  // Fetch top 20 songs on initial load
  useEffect(() => {
    fetchTopSongs();
  }, []);

  // Handle search
  const handleSearch = async () => {
    if (!searchQuery.trim()) return; // Don't search if the query is empty

    try {
      const response = await axios.get(
        `${syncloop_api}?term=${searchQuery}`
      );
      const searchResults = response.data.search.map((result) => ({
        id: result.trackId,
        title: result.trackName,
        titleUrl: result.trackViewUrl,
        artist: result.artistName,
        artistUrl: result.artistViewUrl,
        album: result.collectionName,
        albumUrl: result.collectionViewUrl,
        artwork: result.artworkUrl100,
        previewUrl: result.previewUrl || '',
      }));
      setSongs(searchResults);
    } catch (error) {
      console.error('Error searching songs:', error);
    }
  };

  // Handle Enter key press for search
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Reset to top 20 songs when clicking the "Music Hub" heading
  const resetToTopSongs = () => {
    setSearchQuery('');
    fetchTopSongs();
  };

  return (
    <div className="music-app">
        <div className="navigation-container">
                <Link to="/" className="nav-link home-link">Home</Link>
                <div className="navigation-links">
                  <Link to="/movies" className="nav-link">Movies Hub</Link>
                  <Link to="/books" className="nav-link">Books Hub</Link>
                  {/* <Link to="/videos" className="nav-link">Videos Hub</Link> */}
                </div>
              </div>
      <h1 onClick={resetToTopSongs} style={{ cursor: 'pointer' }}>
        Music Hub
      </h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search songs, artists, or albums..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          <AiOutlineSearch />
        </button>
      </div>
      <div className="song-list">
        {songs.map((song) => (
          <div key={song.id} className="song-card">
            <img src={song.artwork} alt={song.title} className="song-artwork" />
            <div className="song-details">
                <h2 className="song-title">
                    <a href={song.titleUrl} target="_blank" rel="noopener noreferrer">
                    {song.title}
                    </a>
                </h2>
                <p className="song-artist">
                    <a href={song.artistUrl} target="_blank" rel="noopener noreferrer">
                    {song.artist}
                    </a>
                </p>
                <p className="song-album">
                    <a href={song.albumUrl} target="_blank" rel="noopener noreferrer">
                    {song.album}
                    </a>
                </p>
                {song.previewUrl && (
                    <audio controls className="song-preview">
                    <source src={song.previewUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                    </audio>
                )}
                </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicApp;