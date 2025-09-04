import express from 'express';
import { getRandomFunFact, getAllFunFacts } from '../controllers/funFactController.js';

const router = express.Router();

// GET /api/funfacts/random/:country - Get a random fun fact for a specific country
router.get('/random/:country', getRandomFunFact);

// GET /api/funfacts/all/:country - Get all fun facts for a specific country
router.get('/all/:country', getAllFunFacts);

export default router;
