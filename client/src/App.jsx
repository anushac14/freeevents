import React, { useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import PageNotFound from './pages/PageNotFound';
import { Link } from 'react-router-dom';

const App = () => {
  
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => { 
      const response = await fetch('/events'); 
      const data = await response.json(); 
      setEvents(data);
      console.log(response)
    };

    fetchEvents();
  }, []);

  let element = useRoutes([
    {
      path: "/",
      element: <Events data={events} /> 
    },
    {
      path: "/event/:id", 
      element: <EventDetails data={events} /> 
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
         
        </div>
      </header>
      {element}
    </div>
  );
}

export default App;
