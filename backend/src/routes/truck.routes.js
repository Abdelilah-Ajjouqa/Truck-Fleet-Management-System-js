import express from 'express';
import TruckController from '../controllers/truck.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/authorizationMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, TruckController.getAllTrucks);
router.get('/:id', authMiddleware, TruckController.getTruckById);

router.post('/', authMiddleware, isAdmin, TruckController.createTruck);
router.put('/:id', authMiddleware, isAdmin, TruckController.updateTruck);

router.delete('/:id', authMiddleware, isAdmin, TruckController.deleteTruck);

export default router;