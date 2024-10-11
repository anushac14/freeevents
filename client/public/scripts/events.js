const renderEvents = async () => {
  const response = await fetch('/events')  // Fetch the events data from the server
  const data = await response.json()       // Parse the JSON response

  const mainContent = document.getElementById('main-content')

  if (data) {
      data.map(event => {
          const card = document.createElement('div')
          card.classList.add('card')

          const topContainer = document.createElement('div')
          topContainer.classList.add('top-container')

          const bottomContainer = document.createElement('div')
          bottomContainer.classList.add('bottom-container') 

          const name = document.createElement('h3')  // Event name
          name.textContent = event.name
          bottomContainer.appendChild(name)

          const location = document.createElement('p')  // Event location
          location.textContent = 'Location: ' + event.location
          bottomContainer.appendChild(location)

          const eventDate = document.createElement('p')  // Event date
          eventDate.textContent = 'Date: ' + new Date(event.event_date).toLocaleDateString()
          bottomContainer.appendChild(eventDate)

          const eventTime = document.createElement('p')  // Event time
          eventTime.textContent = 'Time: ' + event.event_time
          bottomContainer.appendChild(eventTime)

          const description = document.createElement('p')  // Event description
          description.textContent = 'Description: ' + event.description
          bottomContainer.appendChild(description)

          const category = document.createElement('p')  // Event category
          category.textContent = 'Category: ' + event.category
          bottomContainer.appendChild(category)

          const cost = document.createElement('p')  // Event cost (should be 0 for free events)
          cost.textContent = event.cost === 0 ? 'Free Event' : 'Cost: $' + event.cost
          bottomContainer.appendChild(cost)

          const link = document.createElement('a')  // Event details link
          link.textContent = 'View Event Details'
          link.setAttribute('role', 'button')
          link.href = `/events/${event.id}`
          bottomContainer.appendChild(link)

          card.appendChild(topContainer)
          card.appendChild(bottomContainer)
          mainContent.appendChild(card)
      })
  } else {
      const message = document.createElement('h2')
      message.textContent = 'No Events Available 😞'
      mainContent.appendChild(message)
  }
}

const requestedUrl = window.location.href.split('/').pop()

if (requestedUrl) {
  window.location.href = '../404.html'
} else {
  renderEvents()  // Call the function to render the events
}
