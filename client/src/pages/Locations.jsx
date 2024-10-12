import React from 'react';
import { Link } from 'react-router-dom';
import './Locations.css'; // Ensure this is uncommented for styling

const Locations = ({ data }) => {
  return (
    <div className="locations">
      <h1>Locations</h1>
      <div className="location-grid"> {/* Change from ul to a div for a grid layout */}
        {data.map(location => (
          <div key={location.id} className="location-card"> {/* Use a card for each location */}
            <h3>{location.name}</h3>
            <Link to={`/locations/${location.id}`}>View Events</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Locations;
