import FunFact from '../models/FunFact.js';

// Helper to safely extract the fun fact text supporting both 'funFact' and legacy 'funfact' field names
const extractFunFactText = (doc) => {
  if (!doc) return undefined;
  return doc.funFact || doc.funfact || doc.fun_fact || doc.text; // fallbacks just in case
};

// Get a random fun fact for a specific country
export const getRandomFunFact = async (req, res) => {
  try {
    const { country } = req.params;

    if (!country) {
      return res.status(400).json({
        success: false,
        message: 'Country parameter is required'
      });
    }

    // Support slugs like 'united-states' or 'south_korea'
    const slugDecoded = decodeURIComponent(country)
      .replace(/[-_]+/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim();

    const toTitleCase = (str) => str.split(' ').map(w => w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : '').join(' ');
    const normalizedCountry = toTitleCase(slugDecoded);
    
  // Case–insensitive match for country (handles DB variations like 'japan', 'JAPAN', etc.)
    let funFacts = await FunFact.find({ country: { $regex: `^${normalizedCountry}$`, $options: 'i' } }).lean();

    if (funFacts.length === 0) {
      // Try raw param as-is
      funFacts = await FunFact.find({ country: { $regex: `^${country}$`, $options: 'i' } }).lean();
    }
    
    if (funFacts.length === 0) {
      // Try alternative country name variations
      const alternativeNames = getAlternativeCountryNames(normalizedCountry);
      
  for (const altName of alternativeNames) {
    const altFacts = await FunFact.find({ country: { $regex: `^${altName}$`, $options: 'i' } }).lean();
        if (altFacts.length > 0) {
          const randomIndex = Math.floor(Math.random() * altFacts.length);
          return res.status(200).json({
            success: true,
            data: {
              country: altName,
      funFact: extractFunFactText(altFacts[randomIndex])
            }
          });
        }
      }
      
      return res.status(404).json({
        success: false,
        message: `No fun facts found for ${normalizedCountry}`
      });
    }

    // Get a random fun fact
    const randomIndex = Math.floor(Math.random() * funFacts.length);
  const randomFunFact = funFacts[randomIndex];

    res.status(200).json({
      success: true,
      data: {
        country: randomFunFact.country,
        funFact: extractFunFactText(randomFunFact)
      }
    });

  } catch (error) {
    console.error('Get fun fact error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching fun fact',
      error: error.message
    });
  }
};

// Get all fun facts for a specific country
export const getAllFunFacts = async (req, res) => {
  try {
    const { country } = req.params;

    if (!country) {
      return res.status(400).json({
        success: false,
        message: 'Country parameter is required'
      });
    }
    const slugDecoded = decodeURIComponent(country)
      .replace(/[-_]+/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim();
    const toTitleCase = (str) => str.split(' ').map(w => w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : '').join(' ');
    const normalizedCountry = toTitleCase(slugDecoded);
    let funFacts = await FunFact.find({ country: { $regex: `^${normalizedCountry}$`, $options: 'i' } }).lean();
    if (funFacts.length === 0) {
      funFacts = await FunFact.find({ country: { $regex: `^${country}$`, $options: 'i' } }).lean();
    }

    const cleaned = funFacts.map(f => ({
      _id: f._id,
      country: f.country,
      funFact: extractFunFactText(f)
    }));

    res.status(200).json({
      success: true,
      data: cleaned,
      count: cleaned.length
    });

  } catch (error) {
    console.error('Get all fun facts error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching fun facts',
      error: error.message
    });
  }
};

// Helper function to get alternative country names for better matching
const getAlternativeCountryNames = (country) => {
  const alternatives = {
    'United States': ['USA', 'America', 'US'],
    'United Kingdom': ['UK', 'England', 'Britain', 'Great Britain'],
    'South Korea': ['Korea'],
    'United Arab Emirates': ['UAE', 'Emirates'],
    'New Zealand': ['NZ'],
    'Czech Republic': ['Czechia'],
    'South Africa': ['SA'],
    'Dominican Republic': ['Dominican'],
    'Costa Rica': ['Costa'],
    'Sri Lanka': ['Ceylon'],
    'Myanmar': ['Burma'],
    'Eswatini': ['Swaziland'],
    'North Macedonia': ['Macedonia'],
    'Bosnia And Herzegovina': ['Bosnia', 'Bosnia and Herzegovina'],
    'Trinidad And Tobago': ['Trinidad', 'Trinidad and Tobago'],
    'Antigua And Barbuda': ['Antigua', 'Antigua and Barbuda'],
    'Saint Vincent And The Grenadines': ['Saint Vincent', 'St. Vincent'],
    'Saint Kitts And Nevis': ['Saint Kitts', 'St. Kitts'],
    'Saint Lucia': ['St. Lucia'],
    'Papua New Guinea': ['Papua', 'PNG'],
    'Solomon Islands': ['Solomon'],
    'Marshall Islands': ['Marshall'],
    'Federated States Of Micronesia': ['Micronesia'],
    'Palau': ['Belau'],
    'Samoa': ['Western Samoa'],
    'Tonga': ['Friendly Islands'],
    'Vanuatu': ['New Hebrides'],
    'Fiji': ['Republic of Fiji'],
    'Kiribati': ['Gilbert Islands'],
    'Tuvalu': ['Ellice Islands'],
    'Nauru': ['Pleasant Island'],
    'Marshall Islands': ['Marshall'],
    'Federated States Of Micronesia': ['Micronesia'],
    'Palau': ['Belau'],
    'Samoa': ['Western Samoa'],
    'Tonga': ['Friendly Islands'],
    'Vanuatu': ['New Hebrides'],
    'Fiji': ['Republic of Fiji'],
    'Kiribati': ['Gilbert Islands'],
    'Tuvalu': ['Ellice Islands'],
    'Nauru': ['Pleasant Island']
  };

  return alternatives[country] || [];
};
