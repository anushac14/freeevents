// scripts/books.js

const renderBooks = async () => {
    const response = await fetch('/books')
    const data = await response.json()

    const mainContent = document.getElementById('main-content')

  if (data) {
    data.map(book => {
      const card = document.createElement('div')
      card.classList.add('card')

      const topContainer = document.createElement('div')
      topContainer.classList.add('top-container')

      const bottomContainer = document.createElement('div')
      bottomContainer.classList.add('bottom-container') 

      const title = document.createElement('h3')
      title.textContent = book.title
      bottomContainer.appendChild(title)

      const author = document.createElement('p')
      author.textContent = 'Author: ' + book.author
      bottomContainer.appendChild(author)

      const genre = document.createElement('p')
      genre.textContent = 'Genre: ' + book.genre
      bottomContainer.appendChild(genre)

      const year = document.createElement('p')
      year.textContent = 'Published: ' + book.year
      bottomContainer.appendChild(year)

      const summary = document.createElement('p')
      summary.textContent = 'Summary: ' + book.summary
      bottomContainer.appendChild(summary)

      const link = document.createElement('a')
      link.textContent = 'Read More'
      link.setAttribute('role', 'button')
      link.href = `/books/${book.id}`
      bottomContainer.appendChild(link)

      card.appendChild(topContainer)
      card.appendChild(bottomContainer)
      mainContent.appendChild(card)
    })
  } else {
    const message = document.createElement('h2')
    message.textContent = 'No Books Available 😞'
    mainContent.appendChild(message)
  }
}

renderBooks()

