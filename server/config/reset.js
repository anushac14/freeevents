import { pool } from './database.js'
import './dotenv.js'
import bookData from '../data/books.js'

const createBooksTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS books;

        CREATE TABLE IF NOT EXISTS books (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,
            genre VARCHAR(100) NOT NULL,
            year INT NOT NULL,
            summary TEXT NOT NULL
        )
    `;

    try {
        const res = await pool.query(createTableQuery);
        console.log('🎉 books table created successfully');
    } catch (err) {
        console.error('⚠️ error creating books table', err);
    }
};

const seedBooksTable = async () => {
    await createBooksTable();

    bookData.forEach((book) => {
        const insertQuery = `
            INSERT INTO books (title, author, genre, year, summary) 
            VALUES ($1, $2, $3, $4, $5)
        `;

        const values = [
            book.title,   
            book.author,  
            book.genre,   
            book.year,   
            book.summary  
        ];

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting book', err);
                return;
            }

            console.log(`✅ ${book.title} added successfully`);
        });
    });
};

seedBooksTable();