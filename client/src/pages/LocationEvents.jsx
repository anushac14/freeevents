// src/pages/LocationEvents.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/Card';
import './LocationEvents.css';

const LocationEvents = () => {
    const { id } = useParams();
    const [events, setEvents] = useState([]);
    const [locationName, setLocationName] = useState('');

    useEffect(() => {
        const fetchEventsByLocation = async () => {
            const response = await fetch(`/locations/${id}`);
            const data = await response.json();
            
            if (data.events) {
                setEvents(data.events);
                setLocationName(data.location.name); // Assuming you get location name as well
            } else {
                console.error("No events found for this location:", data);
            }
        };

        fetchEventsByLocation();
    }, [id]);

    return (
        <div className="location-events">
            <h1>Events at {locationName}</h1>
            <main>
                {events.length > 0 ? (
                    events.map(event => (
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
                    ))
                ) : (
                    <h3 className="noResults">No events available at this location.</h3>
                )}
            </main>
        </div>
    );
}

export default LocationEvents;
