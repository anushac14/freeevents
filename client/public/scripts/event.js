const renderEvent = async () => {
    const requestedID = parseInt(window.location.href.split('/').pop());
    const response = await fetch('/events');  // Updated API endpoint for events
    const data = await response.json();
    
    const eventContent = document.getElementById('event-content');  // Updated ID for event content
    let event;

    if (data) {
        event = data.find(event => event.id === requestedID);  // Find event by its ID
    }

    if (event) {
        document.getElementById('name').textContent = event.name;  // Updated for event name
        document.getElementById('location').textContent = 'Location: ' + event.location;  // Updated for event location
        document.getElementById('date').textContent = 'Date: ' + event.date;  // Updated for event date
        document.getElementById('time').textContent = 'Time: ' + event.time;  // Updated for event time
        document.getElementById('category').textContent = 'Category: ' + event.category;  // Updated for event category
        document.getElementById('cost').textContent = 'Cost: ' + event.cost;  // Updated for event cost
        document.getElementById('description').textContent = event.description;  // Updated for event description

        document.title = `Event Details - ${event.name}`;  // Updated title for event
    } else {
        const message = document.createElement('h2');
        message.textContent = 'No Event Details Available 😞';  // Updated message for events
        eventContent.appendChild(message);
    }
};

renderEvent();
