import express from 'express';
import { 
  getReviewsByCountry, 
  createReview, 
  updateReview, 
  deleteReview, 
  rateReview, 
  getReviewStats 
} from '../controllers/reviewController.js';

const router = express.Router();

// GET /api/reviews/country/:country - Get all reviews for a specific country
router.get('/country/:country', getReviewsByCountry);

// GET /api/reviews/stats/:country - Get review statistics for a country
router.get('/stats/:country', getReviewStats);

// POST /api/reviews - Create a new review
router.post('/', createReview);

// PUT /api/reviews/:id - Update a review
router.put('/:id', updateReview);

// DELETE /api/reviews/:id - Delete a review
router.delete('/:id', deleteReview);

// POST /api/reviews/:id/rate - Rate a review as helpful or not helpful
router.post('/:id/rate', rateReview);

export default router;
