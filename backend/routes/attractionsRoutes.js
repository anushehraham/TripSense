import express from "express";
import { 
  getAllAttractions, 
  getAttractionById, 
  getAttractionsByCountry 
} from "../controllers/attractionsController.js";

const router = express.Router();

// GET all attractions → http://localhost:5000/api/attractions
router.get("/", getAllAttractions);

// GET attractions by country → http://localhost:5000/api/attractions/country/france
router.get("/country/:country", getAttractionsByCountry);

// GET attraction by ID → http://localhost:5000/api/attractions/64f1234567890abcdef12345
router.get("/:id", getAttractionById);

export default router;
