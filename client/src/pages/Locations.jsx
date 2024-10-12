import React from 'react';
import { Link } from 'react-router-dom';
import './Locations.css'; // Ensure this is uncommented for styling

const Locations = ({ data }) => {
  return (
    <div className="locations">
      <h1>Locations</h1>
      <ul className="location-list"> {/* Add the class name for styling */}
        {data.map(location => (
          <li key={location.id}>
            <div className="location-card"> {/* Use a card for each location */}
              <h3>{location.name}</h3>
              <Link to={`/locations/${location.id}`}>View Events</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Locations;
