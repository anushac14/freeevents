const renderEvents = async () => {
  const response = await fetch('/events');  // Updated API endpoint for events
  const data = await response.json();

  const mainContent = document.getElementById('main-content');

  if (data) {
      data.map(event => {
          const card = document.createElement('div');
          card.classList.add('card');

          const topContainer = document.createElement('div');
          topContainer.classList.add('top-container');

          const bottomContainer = document.createElement('div');
          bottomContainer.classList.add('bottom-container');

          const name = document.createElement('h3');  // Updated for event name
          name.textContent = event.name;
          bottomContainer.appendChild(name);

          const location = document.createElement('p');  // Updated for event location
          location.textContent = 'Location: ' + event.location;
          bottomContainer.appendChild(location);

          const date = document.createElement('p');  // Updated for event date
          date.textContent = 'Date: ' + event.date;
          bottomContainer.appendChild(date);

          const time = document.createElement('p');  // Updated for event time
          time.textContent = 'Time: ' + event.time;
          bottomContainer.appendChild(time);

          const category = document.createElement('p');  // Updated for event category
          category.textContent = 'Category: ' + event.category;
          bottomContainer.appendChild(category);

          const cost = document.createElement('p');  // Updated for event cost
          cost.textContent = 'Cost: ' + event.cost;
          bottomContainer.appendChild(cost);

          const description = document.createElement('p');  // Updated for event description
          description.textContent = 'Description: ' + event.description;
          bottomContainer.appendChild(description);

          const link = document.createElement('a');
          link.textContent = 'Read More';
          link.setAttribute('role', 'button');
          link.href = `/events/${event.id}`;  // Updated for event ID in the URL
          bottomContainer.appendChild(link);

          card.appendChild(topContainer);
          card.appendChild(bottomContainer);
          mainContent.appendChild(card);
      });
  } else {
      const message = document.createElement('h2');
      message.textContent = 'No Events Available 😞';  // Updated message for events
      mainContent.appendChild(message);
  }
};

const requestedUrl = window.location.href.split('/').pop();

if (requestedUrl) {
  window.location.href = '../404.html';
} else {
  renderEvents();  // Updated function name for rendering events
}
