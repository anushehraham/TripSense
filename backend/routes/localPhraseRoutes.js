import express from "express";
import { 
  getPhrasesByCountry, 
  getAllPhrases, 
  getPhraseById 
} from "../controllers/localPhraseController.js";

const router = express.Router();

// @route   GET /api/localphrase
// @desc    Get all local phrases
// @access  Public
router.get("/", getAllPhrases);

// @route   GET /api/localphrase/country/:country
// @desc    Get local phrases by country
// @access  Public
router.get("/country/:country", getPhrasesByCountry);

// @route   GET /api/localphrase/:id
// @desc    Get local phrase by ID
// @access  Public
router.get("/:id", getPhraseById);

export default router;
