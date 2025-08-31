import Culture from "../models/Culture.js";

// @desc   Get culture information by country
// @route  GET /api/culture/country/:country
// @access Public
export const getCultureByCountry = async (req, res) => {
  try {
    const { country } = req.params;
    
    // Convert slug back to proper country name for database query
    // Handle different slug formats: "belgium" -> "Belgium", "united-states" -> "United States"
    const countryName = country
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    console.log(`Searching for culture information in country: ${countryName}`);
    console.log(`Original slug: ${country}`);

    // Find culture information by country name
    const cultures = await Culture.find({ 
      country: { $regex: new RegExp(countryName, 'i') } 
    });

    console.log(`Found ${cultures.length} culture entries for ${countryName}`);

    if (cultures.length === 0) {
      return res.status(404).json({ 
        message: `No culture information found for ${countryName}`,
        country: countryName
      });
    }

    res.json(cultures);
  } catch (error) {
    console.error("Error fetching culture information:", error);
    res.status(500).json({ 
      message: "Server Error", 
      error: error.message 
    });
  }
};

// @desc   Get all culture information
// @route  GET /api/culture
// @access Public
export const getAllCulture = async (req, res) => {
  try {
    const cultures = await Culture.find({}).sort({ country: 1, aspect: 1 });
    
    if (cultures.length === 0) {
      return res.status(404).json({ message: "No culture information found" });
    }
    
    res.json(cultures);
  } catch (error) {
    res.status(500).json({ 
      message: "Server Error", 
      error: error.message 
    });
  }
};

// @desc   Get culture by ID
// @route  GET /api/culture/:id
// @access Public
export const getCultureById = async (req, res) => {
  try {
    const culture = await Culture.findById(req.params.id);
    
    if (!culture) {
      return res.status(404).json({ message: "Culture information not found" });
    }

    res.json(culture);
  } catch (error) {
    res.status(500).json({ 
      message: "Server Error", 
      error: error.message 
    });
  }
};
