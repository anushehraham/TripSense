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
    console.log('Searching for country:', countryName);
    
    // Try exact match first
    let country = await Country.findOne({ name: countryName });
    
    // If not found, try case-insensitive match
    if (!country) {
      country = await Country.findOne({ 
        name: { $regex: new RegExp(`^${countryName}$`, 'i') } 
      });
    }
    
    // If still not found, try partial match
    if (!country) {
      country = await Country.findOne({ 
        name: { $regex: new RegExp(countryName, 'i') } 
      });
    }
    
    // If still not found, try searching in description
    if (!country) {
      country = await Country.findOne({ 
        description: { $regex: new RegExp(countryName, 'i') } 
      });
    }

    console.log('Found country:', country);

    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }

    res.json(country);
  } catch (error) {
    console.error('Error searching for country:', error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
