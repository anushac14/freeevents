import { pool } from '../config/database.js';

// Fetch all locations
const getLocations = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM locations ORDER BY id ASC');
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Fetch events by location ID (now bound to /locations/:locationId)
const getEventsByLocationId = async (req, res) => {
  const { locationId } = req.params;
  try {
    const locationQuery = await pool.query('SELECT * FROM locations WHERE id = $1', [locationId]);

    if (locationQuery.rows.length === 0) {
      return res.status(404).json({ message: "Location not found" });
    }

    const eventsQuery = await pool.query(
      'SELECT * FROM events WHERE location_id = $1 ORDER BY event_date ASC',
      [locationId]
    );

    res.status(200).json({
      location: locationQuery.rows[0],
      events: eventsQuery.rows
    });
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  getLocations,
  getEventsByLocationId,
};
