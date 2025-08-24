import Country from "../models/Country.js";

// @desc   Get all countries
// @route  GET /api/countries
// @access Public
export const getAllCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc   Get a country by name
// @route  GET /api/countries/:name
// @access Public
export const getCountryByName = async (req, res) => {
  try {
    const countryName = req.params.name;
    const country = await Country.findOne({ name: countryName });

    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }

    res.json(country);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
