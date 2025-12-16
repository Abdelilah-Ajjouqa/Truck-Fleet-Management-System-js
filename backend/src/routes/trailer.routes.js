import express from 'express';
import TrailerController from '../controllers/trailer.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/authorizationMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, TrailerController.getAll);
router.get('/:id', authMiddleware, TrailerController.getById);

router.post('/', authMiddleware, isAdmin, TrailerController.create);
router.put('/:id', authMiddleware, isAdmin, TrailerController.update);
router.delete('/:id', authMiddleware, isAdmin, TrailerController.delete);

export default router;