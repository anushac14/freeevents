import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Ensure this path is correct

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to the Events App</h1>
      <div className="button-container">
        <Link to="/locations">
          <button>All Locations</button>
        </Link>
        <Link to="/events">
          <button>All Events</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
