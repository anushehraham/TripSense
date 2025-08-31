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

    // Find the document that contains the countries array
    const mainDoc = await Attraction.findOne({});
    
    if (!mainDoc || !mainDoc.countries) {
      console.log(`No countries data found in attractions collection`);
      return res.status(404).json({ 
        message: `No attractions data found`,
        country: countryName
      });
    }

    // Log all available countries for debugging
    const availableCountries = mainDoc.countries.map(c => c.name);
    console.log(`Available countries in database:`, availableCountries);

    // Find the specific country in the countries array - try multiple matching strategies
    let countryData = mainDoc.countries.find(c => 
      c.name && c.name.toLowerCase() === countryName.toLowerCase()
    );

    // If not found, try matching with the original slug
    if (!countryData) {
      countryData = mainDoc.countries.find(c => 
        c.slug && c.slug.toLowerCase() === country.toLowerCase()
      );
    }

    // If still not found, try partial matching
    if (!countryData) {
      countryData = mainDoc.countries.find(c => 
        c.name && c.name.toLowerCase().includes(countryName.toLowerCase())
      );
    }

    if (!countryData) {
      console.log(`Country ${countryName} not found in countries array`);
      console.log(`Tried matching: ${countryName}, ${country}`);
      return res.status(404).json({ 
        message: `No attractions found for ${countryName}`,
        country: countryName,
        availableCountries: availableCountries
      });
    }

    // Extract attractions from the country data
    const attractions = countryData.attractions || [];
    
    console.log(`Found ${attractions.length} attractions for ${countryData.name}`);

    if (attractions.length === 0) {
      return res.status(404).json({ 
        message: `No attractions found for ${countryData.name}`,
        country: countryData.name
      });
    }

    // Transform the data to match the frontend expectations
    const transformedAttractions = attractions.map(attraction => ({
      _id: attraction._id || Math.random().toString(36).substr(2, 9), // Generate temporary ID if none exists
      name: attraction.title || attraction.name, // Use title field
      description: attraction.description,
      image: attraction.image,
      country: countryData.name,
      city: attraction.city,
      rating: attraction.rating || 4.5, // Default rating
      bestTime: attraction.bestTime || "All day",
      tips: attraction.tips || "Visit during off-peak hours for better experience",
      location: attraction.city ? `${attraction.city}, ${countryData.name}` : countryData.name
    }));

    res.json(transformedAttractions);
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
    const mainDoc = await Attraction.findOne({});
    
    if (!mainDoc || !mainDoc.countries) {
      return res.status(404).json({ message: "No attractions data found" });
    }
    
    // Transform all countries and their attractions into a flat list
    let allAttractions = [];
    
    mainDoc.countries.forEach(country => {
      if (country.attractions && Array.isArray(country.attractions)) {
        const countryAttractions = country.attractions.map(attraction => ({
          _id: attraction._id || Math.random().toString(36).substr(2, 9),
          name: attraction.title || attraction.name,
          description: attraction.description,
          image: attraction.image,
          country: country.name,
          city: attraction.city,
          rating: attraction.rating || 4.5,
          bestTime: attraction.bestTime || "All day",
          tips: attraction.tips || "Visit during off-peak hours for better experience",
          location: attraction.city ? `${attraction.city}, ${country.name}` : country.name
        }));
        
        allAttractions = [...allAttractions, ...countryAttractions];
      }
    });
    
    res.json(allAttractions);
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
