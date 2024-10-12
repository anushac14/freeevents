import { pool } from './database.js';
import './dotenv.js';
import eventData from '../data/events.js';
import locationsData from '../data/locations.js';

const createLocationsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS locations;

    CREATE TABLE IF NOT EXISTS locations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log('🎉 locations table created successfully');
  } catch (err) {
    console.error('⚠️ error creating locations table', err);
  }
};

const createEventsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS events;

    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      location_id INT REFERENCES locations(id) ON DELETE CASCADE,  -- Foreign key to locations table
      event_date DATE NOT NULL,
      event_time TIME NOT NULL,
      description TEXT NOT NULL,
      category VARCHAR(100),
      cost DECIMAL(10, 2) DEFAULT 0
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log('🎉 events table created successfully');
  } catch (err) {
    console.error('⚠️ error creating events table', err);
  }
};

const seedLocationsTable = async () => {
  locationsData.forEach(async (location) => {
    const insertQuery = `INSERT INTO locations (name) VALUES ($1) RETURNING id`;
    const values = [location.name];

    try {
      const res = await pool.query(insertQuery, values);
      console.log(`✅ ${location.name} added successfully`);
    } catch (err) {
      console.error('⚠️ error inserting location', err);
    }
  });
};

const seedEventsTable = async () => {
  await createLocationsTable();  // Make sure locations are created first
  await createEventsTable();

  eventData.forEach((event) => {
    const insertQuery = `
      INSERT INTO events (name, location_id, event_date, event_time, description, category, cost) 
      VALUES ($1, (SELECT id FROM locations WHERE name = $2), $3, $4, $5, $6, $7)
    `;

    const values = [
      event.name,
      event.location,  // Match the location name
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

seedLocationsTable().then(seedEventsTable);
