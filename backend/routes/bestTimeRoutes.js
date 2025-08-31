import express from "express";
import { 
  getBestTimeByCountry, 
  getAllBestTime, 
  getBestTimeById 
} from "../controllers/bestTimeController.js";

const router = express.Router();

// @route   GET /api/besttime
// @desc    Get all best time information
// @access  Public
router.get("/", getAllBestTime);

// @route   GET /api/besttime/country/:country
// @desc    Get best time by country
// @access  Public
router.get("/country/:country", getBestTimeByCountry);

// @route   GET /api/besttime/:id
// @desc    Get best time by ID
// @access  Public
router.get("/:id", getBestTimeById);

export default router;
