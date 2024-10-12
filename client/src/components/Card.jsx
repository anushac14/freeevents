import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

const Card = (props) => { 
    
    const [event, setEvent] = useState({
        id: 0, 
        name: "", 
        date: "", 
        time: "", 
        location: "", 
        category: "", 
        cost: "", 
        description: "", 
        image: ""
    });

    useEffect(() => {
        setEvent({
            id: props.id, 
            name: props.name, 
            date: props.date, 
            time: props.time,
            location: props.location, 
            category: props.category, 
            cost: props.cost, 
            description: props.description, 
            image: props.image
        });
    }, [props]);

    const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
    });
    const formattedTime = event.time ? event.time.slice(0, 5) : ''; 

    return (
        <div className="card">
            <div className='top-container' style={{ backgroundImage: `url(${event.image})` }}></div>
            <div className='bottom-container'>
                <h3>{event.name}</h3>
                <p>{'Date: ' + formattedDate}</p>
                <p>{'Time: ' + formattedTime}</p>
                <p>{'Location: ' + event.location}</p>
                <p>{'Category: ' + event.category}</p>
                <p>{'Cost: ' + (event.cost === "0.00" ? "Free" : `$${event.cost}`)}</p>
                <Link to={'/event/' + event.id}><a>Read More →</a></Link>
            </div>
        </div>
    );
}

export default Card;
