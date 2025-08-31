import BestTime from "../models/BestTime.js";

// @desc   Get best time by country
// @route  GET /api/besttime/country/:country
// @access Public
export const getBestTimeByCountry = async (req, res) => {
  try {
    const { country } = req.params;
    
    // Convert slug back to proper country name for database query
    // Handle different slug formats: "belgium" -> "Belgium", "united-states" -> "United States"
    const countryName = country
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    console.log(`Searching for best time in country: ${countryName}`);
    console.log(`Original slug: ${country}`);

    // Find best time by country name
    const bestTime = await BestTime.find({ 
      country: { $regex: new RegExp(countryName, 'i') } 
    });

    console.log(`Found ${bestTime.length} best time entries for ${countryName}`);

    if (bestTime.length === 0) {
      return res.status(404).json({ 
        message: `No best time information found for ${countryName}`,
        country: countryName
      });
    }

    res.json(bestTime);
  } catch (error) {
    console.error("Error fetching best time:", error);
    res.status(500).json({ 
      message: "Server Error", 
      error: error.message 
    });
  }
};

// @desc   Get all best time information
// @route  GET /api/besttime
// @access Public
export const getAllBestTime = async (req, res) => {
  try {
    const bestTime = await BestTime.find({}).sort({ country: 1 });
    
    if (bestTime.length === 0) {
      return res.status(404).json({ message: "No best time information found" });
    }
    
    res.json(bestTime);
  } catch (error) {
    res.status(500).json({ 
      message: "Server Error", 
      error: error.message 
    });
  }
};

// @desc   Get best time by ID
// @route  GET /api/besttime/:id
// @access Public
export const getBestTimeById = async (req, res) => {
  try {
    const bestTime = await BestTime.findById(req.params.id);
    
    if (!bestTime) {
      return res.status(404).json({ message: "Best time information not found" });
    }

    res.json(bestTime);
  } catch (error) {
    res.status(500).json({ 
      message: "Server Error", 
      error: error.message 
    });
  }
};
