import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Welcome to the <br/> Ultimate Entertainment Hub!</h1>
      <h3>— Get Started Here —</h3>
      <div className="navigation-links">
        <Link to="/movies" className="nav-link">Movies Hub</Link>
        <Link to="/music" className="nav-link">Music Hub</Link>
        <Link to="/books" className="nav-link">Books Hub</Link>
      </div>
    </div>
  );
};

export default LandingPage;