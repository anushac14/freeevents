import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import './Events.css';

const Events = (props) => {

    const [events, setEvents] = useState([]);
    const [location, setLocation] = useState(''); 
    const [locations, setLocations] = useState([]); 

    useEffect(() => {
        setEvents(props.data); 

        const uniqueLocations = [...new Set(props.data.map(event => event.location))];
        setLocations(uniqueLocations);
    }, [props]);

    const filteredEvents = events.filter(event => location === '' || event.location === location);

    return (
        <div className="Events">
            <div className="header-container">
                <h1>Free Events</h1>
                <button className="home-button">Home</button>
            </div>

            <div className="filter-container">
                <label htmlFor="location-filter">Filter by Location:</label>
                <select id="location-filter" onChange={(e) => setLocation(e.target.value)}>
                    <option value=''>All Locations</option>
                    {locations.map((loc, index) => (
                        <option key={index} value={loc}>{loc}</option>
                    ))}
                </select>
            </div>

            <main>
                {
                    filteredEvents && filteredEvents.length > 0 ? 
                    filteredEvents.map((event) =>
                        <Card 
                            key={event.id}
                            id={event.id}
                            name={event.name}
                            date={event.event_date}
                            time={event.event_time}
                            location={event.location}
                            category={event.category}
                            cost={event.cost}
                            description={event.description}
                            image={event.image} 
                        />
                    ) : <h3 className="noResults">{'No Events Available 😞'}</h3>
                }
            </main>
        </div>
    );
}

export default Events;
