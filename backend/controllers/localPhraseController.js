import LocalPhrase from "../models/LocalPhrase.js";

// @desc   Get local phrases by country
// @route  GET /api/localphrase/country/:country
// @access Public
export const getPhrasesByCountry = async (req, res) => {
  try {
    const { country } = req.params;
    
    // Convert slug back to proper country name for database query
    // Handle different slug formats: "belgium" -> "Belgium", "united-states" -> "United States"
    const countryName = country
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    console.log(`Searching for local phrases in country: ${countryName}`);
    console.log(`Original slug: ${country}`);

    // Find phrases by country name
    const phrases = await LocalPhrase.find({ 
      country: { $regex: new RegExp(countryName, 'i') } 
    });

    console.log(`Found ${phrases.length} phrases for ${countryName}`);

    if (phrases.length === 0) {
      return res.status(404).json({ 
        message: `No local phrases found for ${countryName}`,
        country: countryName
      });
    }

    res.json(phrases);
  } catch (error) {
    console.error("Error fetching local phrases:", error);
    res.status(500).json({ 
      message: "Server Error", 
      error: error.message 
    });
  }
};

// @desc   Get all local phrases
// @route  GET /api/localphrase
// @access Public
export const getAllPhrases = async (req, res) => {
  try {
    const phrases = await LocalPhrase.find({}).sort({ country: 1, phrase: 1 });
    
    if (phrases.length === 0) {
      return res.status(404).json({ message: "No local phrases found" });
    }
    
    res.json(phrases);
  } catch (error) {
    res.status(500).json({ 
      message: "Server Error", 
      error: error.message 
    });
  }
};

// @desc   Get phrase by ID
// @route  GET /api/localphrase/:id
// @access Public
export const getPhraseById = async (req, res) => {
  try {
    const phrase = await LocalPhrase.findById(req.params.id);
    
    if (!phrase) {
      return res.status(404).json({ message: "Local phrase not found" });
    }

    res.json(phrase);
  } catch (error) {
    res.status(500).json({ 
      message: "Server Error", 
      error: error.message 
    });
  }
};
