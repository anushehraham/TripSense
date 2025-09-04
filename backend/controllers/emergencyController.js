import Emergency from '../models/Emergency.js';

// Get emergency information by country
export const getEmergencyByCountry = async (req, res) => {
  try {
    const { country } = req.params;

    if (!country) {
      return res.status(400).json({
        success: false,
        message: 'Country parameter is required'
      });
    }

    // Search for emergency info by country name (case insensitive)
    const emergencyInfo = await Emergency.findOne({
      country: { $regex: new RegExp(country, 'i') }
    });

    console.log('Searching for country:', country);
    console.log('Found emergency info:', emergencyInfo);

    if (!emergencyInfo) {
      return res.status(404).json({
        success: false,
        message: `Emergency information not found for ${country}`
      });
    }

    res.status(200).json({
      success: true,
      data: emergencyInfo
    });

  } catch (error) {
    console.error('Get emergency info error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching emergency information',
      error: error.message
    });
  }
};

// Get all emergency information
export const getAllEmergency = async (req, res) => {
  try {
    const emergencyList = await Emergency.find({}).sort({ country: 1 });

    res.status(200).json({
      success: true,
      data: emergencyList
    });

  } catch (error) {
    console.error('Get all emergency info error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching emergency information',
      error: error.message
    });
  }
};
