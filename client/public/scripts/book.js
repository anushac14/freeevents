const renderBook = async () => {
    const requestedID = parseInt(window.location.href.split('/').pop());
    const response = await fetch('/books');  // This should be your API endpoint
    const data = await response.json();
    
    const bookContent = document.getElementById('book-content');
    let book;

    if (data) {
        book = data.find(book => book.id === requestedID);
    }

    if (book) {
        document.getElementById('title').textContent = book.title;
        document.getElementById('author').textContent = 'Author: ' + book.author;
        document.getElementById('publishedOn').textContent = 'Published On: ' + book.publishedOn;
        document.getElementById('genre').textContent = 'Genre: ' + book.genre;
        document.getElementById('price').textContent = 'Price: ' + book.price;
        document.getElementById('summary').textContent = book.summary;

        document.title = `Book Details - ${book.title}`;
    } else {
        const message = document.createElement('h2');
        message.textContent = 'No Book Details Available 😞';
        bookContent.appendChild(message);
    }
};

renderBook();
