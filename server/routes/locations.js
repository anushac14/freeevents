import express from 'express';
import LocationsController from '../controllers/locations.js';

const router = express.Router();

// Route to get all locations
router.get('/', LocationsController.getLocations);

// Route to get events by location ID directly with /:locationId
router.get('/:locationId', LocationsController.getEventsByLocationId);

export default router;
