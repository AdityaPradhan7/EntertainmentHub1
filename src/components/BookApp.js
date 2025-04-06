import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineSearch } from 'react-icons/ai';
import './BookApp.css';
import { Link } from 'react-router-dom';

const Bearer_Token = process.env.REACT_APP_BEARER_TOKEN; // Load environment variable

const BooksApp = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [genres] = useState([
    { id: 'all', name: 'All Genres' },
    { id: 'fiction', name: 'Fiction' },
    { id: 'nonfiction', name: 'Non-fiction' },
    { id: 'humor', name: 'Comedy' },
    { id: 'mystery_and_detective_stories', name: 'Mystery, Detective & Crime' },
    { id: 'love', name: 'Love' },
    { id: 'psychology', name: 'Psychology' },
    { id: 'philosophy', name: 'Philosophy' },
    { id: 'business', name: 'Business & Finance' },
    { id: 'history', name: 'History' },
    { id: 'science', name: 'Science' },
    { id: 'horror', name: 'Horror' },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch trending books
  const fetchTrendingBooks = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await axios.get(
        `https://cloud.syncloop.com/tenant/AdityaPradhan/public/packages.UltimateEntertainmentHub.APIs.OpenLibrary_trending.main`
      );
  
      if (response.data?.trending) {
        const trendingBooks = response.data.trending.map((book) => ({
          id: book.key,
          title: book.title,
          titleUrl: `https://openlibrary.org/books/${book.cover_edition_key}`,
          authorNames: book.author_name || [],
          authorKeys: book.author_key || [],
          coverId: book.cover_i,
          firstPublishYear: book.first_publish_year,
          editionCount: book.edition_count,
        }));
        setBooks(trendingBooks);
      } else {
        console.error('Invalid API response structure:', response.data);
      }
    } catch (error) {
      console.error('Error fetching trending books:', error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Fetch trending books on initial load
  useEffect(() => {
    fetchTrendingBooks();
  }, []);

  // Handle genre change
  const handleGenreChange = async (genre) => {
    setSelectedGenre(genre);
    if (genre === 'all') {
      fetchTrendingBooks();
    }

    else {
      // Fetch books by genre
      try {
        const response = await axios.get(
          `https://cloud.syncloop.com/tenant/AdityaPradhan/public/packages.UltimateEntertainmentHub.APIs.OpenLibrary_genre.main?genre=${genre}`
        );
  
        if (response.data?.genres?.works) {
          const genreBooks = response.data.genres.works.map((book) => ({
            id: book.key,
            title: book.title,
            titleUrl: `https://openlibrary.org/books/${book.cover_edition_key}`,
            authorNames: book.authors?.map((author) => author.name) || [],
            authorKeys: book.authors?.map((author) => author.key) || [],
            coverId: book.cover_id,
            firstPublishYear: book.first_publish_year,
            editionCount: book.edition_count,
          }));
          setBooks(genreBooks);
        } else {
          console.error('Invalid API response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching books by genre:', error);
      }
    }
  };

  // Handle search
  const handleSearch = async () => {
    if (!searchQuery.trim()) return; // Don't search if the query is empty
  
    try {
      const response = await axios.get(
        `https://cloud.syncloop.com/tenant/AdityaPradhan/public/packages.UltimateEntertainmentHub.APIs.OpenLibrary_Search.main?q=${encodeURIComponent(
          searchQuery
        )}`
      );
  
      if (response.data?.search?.docs) {
        const searchResults = response.data.search.docs.map((book) => ({
          id: book.key,
          title: book.title,
          titleUrl: `https://openlibrary.org/books/${book.cover_edition_key}`,
          authorNames: book.author_name || [],
          authorKeys: book.author_key || [],
          coverId: book.cover_i,
          firstPublishYear: book.first_publish_year,
          editionCount: book.edition_count,
        }));
        setBooks(searchResults);
      } else {
        console.error('Invalid API response structure:', response.data);
      }
    } catch (error) {
      console.error('Error searching books:', error);
    }
  };

  // Handle Enter key press for search
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const resetToTrendingBooks = () => {
    setSearchQuery('');
    setSelectedGenre('all');
    fetchTrendingBooks();
  };

  return (
    <div className="books-app">
      <div className="navigation-container">
              <Link to="/" className="nav-link home-link">Home</Link>
              <div className="navigation-links">
                <Link to="/movies" className="nav-link">Movies Hub</Link>
                <Link to="/music" className="nav-link">Music Hub</Link>
                {/* <Link to="/videos" className="nav-link">Videos Hub</Link> */}
              </div>
            </div>
      <h1 onClick={resetToTrendingBooks} style={{ cursor: 'pointer' }}>
        Books Hub
      </h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          <AiOutlineSearch />
        </button>
      </div>
      <div className="filters">
        <label htmlFor="genre">Genre:</label>
        <select id="genre" value={selectedGenre} onChange={(e) => handleGenreChange(e.target.value)}>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      {isLoading ? (
        <p id='loading'>Loading...</p>
      ) : (
        <div className="book-list">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <img
                src={`https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`}
                alt={book.title}
                className="book-cover"
              />
              <div className="book-details">
                <h2 className="book-title">
                  <a href={book.titleUrl} target="_blank" rel="noopener noreferrer">
                    {book.title}
                  </a>
                </h2>
                <p className="book-authors">
                  {book.authorNames.map((name, index) => (
                    <a
                      key={book.authorKeys[index]}
                      href={`https://openlibrary.org/authors/${book.authorKeys[index]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {name}
                      {index < book.authorNames.length - 1 ? ', ' : ''}
                    </a>
                  ))}
                </p>
                <p className="book-year">First Published: {book.firstPublishYear}</p>
                <p className="book-editions">Editions: {book.editionCount}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksApp;