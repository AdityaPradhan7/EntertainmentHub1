import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ParticlesBackground from './components/ParticlesBackground';
import LandingPage from './components/LandingPage';
import MovieApp from './components/MovieApp';
import MusicApp from './components/MusicApp';
import BookApp from './components/BookApp';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <ParticlesBackground />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/movies" element={<MovieApp />} />
          <Route path="/music" element={<MusicApp />} />
          <Route path="/books" element={<BookApp />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
