import Attraction from "../models/Attraction.js";

// @desc   Get attractions by country
// @route  GET /api/attractions/country/:country
// @access Public
export const getAttractionsByCountry = async (req, res) => {
  try {
    const { country } = req.params;
    
    // Convert slug back to proper country name for database query
    // Handle different slug formats: "belgium" -> "Belgium", "united-states" -> "United States"
    const countryName = country
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    console.log(`Searching for attractions in country: ${countryName}`);
    console.log(`Original slug: ${country}`);

    // Find attractions by country name
    const attractions = await Attraction.find({ 
      country: { $regex: new RegExp(countryName, 'i') } 
    });

    console.log(`Found ${attractions.length} attractions for ${countryName}`);

    if (attractions.length === 0) {
      return res.status(404).json({ 
        message: `No attractions found for ${countryName}`,
        country: countryName
      });
    }

    res.json(attractions);
  } catch (error) {
    console.error("Error fetching attractions:", error);
    res.status(500).json({ 
      message: "Server Error", 
      error: error.message 
    });
  }
};

// @desc   Get all attractions
// @route  GET /api/attractions
// @access Public
export const getAllAttractions = async (req, res) => {
  try {
    const attractions = await Attraction.find({}).sort({ rating: -1 });
    
    if (attractions.length === 0) {
      return res.status(404).json({ message: "No attractions found" });
    }
    
    res.json(attractions);
  } catch (error) {
    res.status(500).json({ 
      message: "Server Error", 
      error: error.message 
    });
  }
};

// @desc   Get attraction by ID
// @route  GET /api/attractions/:id
// @access Public
export const getAttractionById = async (req, res) => {
  try {
    const attraction = await Attraction.findById(req.params.id);
    
    if (!attraction) {
      return res.status(404).json({ message: "Attraction not found" });
    }

    res.json(attraction);
  } catch (error) {
    res.status(500).json({ 
      message: "Server Error", 
      error: error.message 
    });
  }
};
