import express from "express";
import { getAllCountries, getCountryByName } from "../controllers/countryController.js";

const router = express.Router();

// GET all countries → http://localhost:5000/api/countries
router.get("/", getAllCountries);

// GET country by name → http://localhost:5000/api/countries/India
router.get("/:name", getCountryByName);

export default router;
