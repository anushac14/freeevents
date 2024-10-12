import React, { useState, useEffect } from 'react';

const EventDetails = ({ data }) => { 

    const [event, setEvent] = useState({ 
        id: 0,
        name: "",
        date: "", 
        location: "",
        image: "",
        description: "",
        organizedBy: "", 
        organizedOn: "" 
    });

    useEffect(() => {
        const fetchEvent = async () => {
            const requestedID = parseInt(window.location.href.split('/').pop());
            const response = await fetch('/events'); 
            const data = await response.json();
            
            const foundEvent = data.find(event => event.id === requestedID); 
            if (foundEvent) {
                setEvent(foundEvent); 
            }
        };

        fetchEvent();
    }, []); 

    return (
        <div className="EventDetails"> 
            <main id="event-content" className="event-info"> 
                <div className="image-container">
                </div>
                <div className="event-details">
                    <h2 id="name">{event.name}</h2>
                    <p>{'Category: ' + event.category}</p> 
                    <p id="date">{'Date: ' + event.event_date}</p> 
                    <p>{'Time: ' + event.event_time}</p> 
                    <p id="location">{'Location: ' + event.location}</p> 
                    <p id="description">{event.description}</p>
                </div>
            </main>
        </div>
    );
}

export default EventDetails;
