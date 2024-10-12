// src/components/Locations.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Locations = () => {
    const [locations, setLocations] = useState([]);

    // Fetch all locations on component mount
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get('/events/locations'); // Adjust the endpoint if necessary
                setLocations(response.data);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchLocations();
    }, []);

    return (
        <div>
            <h1>Locations</h1>
            <ul>
                {locations.map(location => (
                    <li key={location.id}>
                        <Link to={`/locations/${location.id}`}>
                            {location.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Locations;
