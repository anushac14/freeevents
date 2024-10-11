import { pool } from './database.js';
import './dotenv.js';
import eventData from '../data/events.js';

const createEventsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS events;

        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            location VARCHAR(255) NOT NULL,
            event_date DATE NOT NULL,
            event_time TIME NOT NULL,
            description TEXT NOT NULL,
            category VARCHAR(100),
            cost DECIMAL(10, 2) DEFAULT 0
        )
    `;

    try {
        const res = await pool.query(createTableQuery);
        console.log('🎉 events table created successfully');
    } catch (err) {
        console.error('⚠️ error creating events table', err);
    }
};

const seedEventsTable = async () => {
    await createEventsTable();

    eventData.forEach((event) => {
        const insertQuery = `
            INSERT INTO events (name, location, event_date, event_time, description, category, cost) 
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;

        const values = [
            event.name,
            event.location,
            event.event_date,
            event.event_time,
            event.description,
            event.category,
            event.cost
        ];

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting event', err);
                return;
            }

            console.log(`✅ ${event.name} added successfully`);
        });
    });
};

seedEventsTable();
