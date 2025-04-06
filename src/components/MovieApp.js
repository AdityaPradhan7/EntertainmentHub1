import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineSearch } from 'react-icons/ai';
import './MovieApp.css';
import { Link } from 'react-router-dom';

const syncloop_api = 'https://cloud.syncloop.com/tenant/AdityaPradhan/public/packages.UltimateEntertainmentHub.APIs.TMDB.main';
const bearerToken = process.env.REACT_APP_BEARER_TOKEN; // Load environment variable

const MovieApp = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [expandedMovieId, setExpandedMovieId] = useState(null);

  // 'query' parameter is used to filter the results based on the text provided
  // (write it or not, bcoz its not used in fetchGenres function)

  // other than these two, there are parameters specific to the api, here TMDb api
  // read them on https://developer.themoviedb.org/reference/search-movie

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await axios.get(
        //Genre
        `${syncloop_api}`
      );
      setGenres(response.data.genres);
    };
    fetchGenres();
    
  }, []);

  const fetchMovies = async () => {
    const response = await axios.get(
      //Discover
      `${syncloop_api}?sort_by=${sortBy}&with_genres=${selectedGenre}`
      // {
      //   params: {
      //     sort_by: sortBy, // 'sort_by' allows you to order the returned results in a particular way, such as by popularity, release date, revenue, etc.
      //     with_genres: selectedGenre, 
      //   },
      // }
    );
    setMovies(response.data.discover);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(
        //Discover
        `${syncloop_api}?sort_by=${sortBy}&with_genres=${selectedGenre}`
        // {
        //   params: {
        //     sort_by: sortBy, // 'sort_by' allows you to order the returned results in a particular way, such as by popularity, release date, revenue, etc.
        //     with_genres: selectedGenre, 
        //   },
        // }
      );
      setMovies(response.data.discover);
    };
    fetchMovies();
  }, [sortBy, selectedGenre]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleSearchSubmit = async () => {
    if (!searchQuery.trim()) return; // Don't search if the query is empty
    const response = await axios.get(
      // Search
      `${syncloop_api}?query=${searchQuery}`
      // {
      //   params: {
      //     query: searchQuery,
      //   }
      // }
    );
    setMovies(response.data.search);
  };

  const handleEnterSubmit = async (e) => {
    if(e.key==="Enter"){
      handleSearchSubmit();
    }
  };

  const toggleDescription = (movieId) => {
    setExpandedMovieId(expandedMovieId === movieId ? null : movieId);
  };


  const resetToDefaultMovies = () => {
    setSearchQuery('');
    setSortBy('popularity.desc');
    setSelectedGenre('');
    fetchMovies();
  };

  return (
    <div className='movie-app'>
      <div className="navigation-container">
        <Link to="/" className="nav-link home-link">Home</Link>
        <div className="navigation-links">
          <Link to="/music" className="nav-link">Music Hub</Link>
          <Link to="/books" className="nav-link">Books Hub</Link>
          {/* <Link to="/videos" className="nav-link">Videos Hub</Link> */}
        </div>
      </div>
      <h1 onClick={resetToDefaultMovies} style={{ cursor: 'pointer' }}>
        Movies Hub
      </h1>
      <div className="search-bar">
        <input type="text" placeholder="Search movies..." value={searchQuery} onChange={handleSearchChange} onKeyPress={handleEnterSubmit} className='search-input'/>
        <button onClick={handleSearchSubmit} className="search-button">
          <AiOutlineSearch />
        </button>
      </div>
      <div className="filters">
        <label htmlFor="sort-by">Sort By:</label>
        <select id="sort-by" value={sortBy} onChange={handleSortChange}>
          <option value="popularity.desc">Popularity Descending</option>
          <option value="popularity.asc">Popularity Ascending</option>
          <option value="vote_average.desc">Rating Descending</option>
          <option value="vote_average.asc">Rating Ascending</option>
          <option value="primary_release_date.desc">Release Date Descending</option>
          <option value="primary_release_date.asc">Release Date Ascending</option>
        </select>
        <label htmlFor="genre">Genre:</label>
        <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <div className="movie-wrapper">
      {movies.map((movie) => (
        <div key={movie.id} className={`movie ${expandedMovieId === movie.id ? 'expanded' : ''}`}>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <h2>{movie.title}</h2>
          <p className='rating'>Rating: {movie.vote_average}</p>
          <p className='releaseDate'>Released: {movie.release_date}</p>
          {expandedMovieId === movie.id ? (
            <p>{movie.overview}</p>
          ) : (
            <p id='overview'>{movie.overview.substring(0, 100)}...</p>
          )}
          <button onClick={() => toggleDescription(movie.id)} className='read-more'>
            {expandedMovieId === movie.id ? 'Show Less' : 'Read More'}
          </button>
        </div>
      ))}
      </div>
    </div>
  );
};

export default MovieApp;