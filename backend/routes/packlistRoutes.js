import express from 'express';
import { 
  savePacklist, 
  getPacklist, 
  addItem, 
  updateItem, 
  deleteItem, 
  deletePacklist 
} from '../controllers/packlistController.js';

const router = express.Router();

// POST /api/packlist - Save entire packlist
router.post('/', savePacklist);

// GET /api/packlist/:userId - Get packlist for user
router.get('/:userId', getPacklist);

// POST /api/packlist/:userId/item - Add item to packlist
router.post('/:userId/item', addItem);

// PUT /api/packlist/:userId/item/:itemId - Update item in packlist
router.put('/:userId/item/:itemId', updateItem);

// DELETE /api/packlist/:userId/item/:itemId - Delete item from packlist
router.delete('/:userId/item/:itemId', deleteItem);

// DELETE /api/packlist/:userId - Delete entire packlist
router.delete('/:userId', deletePacklist);

export default router;
