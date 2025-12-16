import express from 'express';
import TripController from '../controllers/trip.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/authorizationMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, TripController.getMyTrips);
router.patch('/:id/status', authMiddleware, TripController.updateStatus);
router.post('/', authMiddleware, isAdmin, TripController.createTrip);
router.delete('/:id', authMiddleware, isAdmin, TripController.deleteTrip);

export default router;