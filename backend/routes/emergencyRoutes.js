import express from 'express';
import { getEmergencyByCountry, getAllEmergency } from '../controllers/emergencyController.js';

const router = express.Router();

// GET /api/emergency - Get all emergency information
router.get('/', getAllEmergency);

// GET /api/emergency/country/:country - Get emergency info by country
router.get('/country/:country', getEmergencyByCountry);

export default router;
