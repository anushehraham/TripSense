import express from "express";
import { 
  getCultureByCountry, 
  getAllCulture, 
  getCultureById 
} from "../controllers/cultureController.js";

const router = express.Router();

// @route   GET /api/culture
// @desc    Get all culture information
// @access  Public
router.get("/", getAllCulture);

// @route   GET /api/culture/country/:country
// @desc    Get culture information by country
// @access  Public
router.get("/country/:country", getCultureByCountry);

// @route   GET /api/culture/:id
// @desc    Get culture by ID
// @access  Public
router.get("/:id", getCultureById);

export default router;
