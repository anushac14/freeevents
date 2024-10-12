import React, { useState, useEffect } from 'react';
import { useRoutes, Link } from 'react-router-dom';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import Locations from './pages/Locations';
import LocationEvents from './pages/LocationEvents';
import PageNotFound from './pages/PageNotFound';
import Home from './pages/Home';

const App = () => {
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('/events');
      const data = await response.json();
      setEvents(data);
    };

    const fetchLocations = async () => {
      const response = await fetch('/locations');
      const data = await response.json();
      setLocations(data);
    };

    fetchEvents();
    fetchLocations();
  }, []);

  let element = useRoutes([
    {
      path: "/",
      element: <Home /> // Page with 2 buttons
    },
    {
      path: "/events",
      element: <Events data={events} /> // Shows all events
    },
    {
      path: "/event/:id",
      element: <EventDetails data={events} /> // Event details
    },
    {
      path: "/locations",
      element: <Locations data={locations} /> // Shows all locations
    },
    {
      path: "/locations/:id",
      element: <LocationEvents /> // Shows events filtered by location
    },
    {
      path: "/*",
      element: <PageNotFound />
    }
  ]);

  return (
    <div className="App">
      <header>
        <div className="header-container">
          <Link to="/">Home</Link>
        </div>
      </header>
      {element}
    </div>
  );
}

export default App;
