import express from "express";
import { 
  getFoodsByCountry, 
  getAllFoods, 
  getFoodById 
} from "../controllers/foodController.js";

const router = express.Router();

// GET /api/foods - Get all foods from all countries
router.get("/", getAllFoods);

// GET /api/foods/:country - Get foods by country (e.g., /api/foods/belgium)
router.get("/:country", getFoodsByCountry);

// GET /api/foods/id/:id - Get food by ID (if needed)
router.get("/id/:id", getFoodById);

export default router;
