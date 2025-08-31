import Food from "../models/Food.js";

// @desc   Get foods by country
// @route  GET /api/foods/:country
// @access Public
export const getFoodsByCountry = async (req, res) => {
  try {
    const { country } = req.params;
    
    // Convert slug back to proper country name for database query
    // Handle different slug formats: "belgium" -> "Belgium", "united-states" -> "United States"
    const countryName = country
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    console.log(`Searching for foods in country: ${countryName}`);
    console.log(`Original slug: ${country}`);

    // Find all food documents where country matches
    const foods = await Food.find({ 
      country: { $regex: countryName, $options: 'i' } 
    });

    console.log(`Found ${foods.length} foods for ${countryName}`);

    if (foods.length === 0) {
      return res.status(404).json({ 
        message: `No foods found for ${countryName}`,
        country: countryName
      });
    }

    // Transform the data to match the frontend expectations
    const transformedFoods = foods.map(food => ({
      _id: food._id || Math.random().toString(36).substr(2, 9),
      name: food.name, // Use name field directly
      description: food.description,
      image: food.image,
      type: food.category || food.type || "Traditional", // Use category field
      price: food.priceRange || food.price || "Varies", // Use priceRange field
      bestPlace: food.bestPlace,
      tips: food.tip || food.tips || "Best enjoyed fresh and hot", // Use tip field
      cuisine: food.cuisine,
      difficulty: food.difficulty,
      cookingTime: food.cookingTime,
      ingredients: food.ingredients,
      season: food.season,
      rating: food.rating || 4.5
    }));

    res.json(transformedFoods);
  } catch (error) {
    console.error("Error fetching foods:", error);
    res.status(500).json({ 
      message: "Server Error", 
      error: error.message 
    });
  }
};

// @desc   Get all foods
// @route  GET /api/foods
// @access Public
export const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find({});
    
    if (!foods || foods.length === 0) {
      return res.status(404).json({ message: "No foods data found" });
    }
    
    // Transform all foods to match frontend expectations
    const transformedFoods = foods.map(food => ({
      _id: food._id || Math.random().toString(36).substr(2, 9),
      name: food.name,
      description: food.description,
      image: food.image,
      type: food.category || food.type || "Traditional",
      price: food.priceRange || food.price || "Varies",
      bestPlace: food.bestPlace,
      tips: food.tip || food.tips || "Best enjoyed fresh and hot",
      cuisine: food.cuisine,
      difficulty: food.difficulty,
      cookingTime: food.cookingTime,
      ingredients: food.ingredients,
      season: food.season,
      rating: food.rating || 4.5,
      country: food.country
    }));
    
    res.json(transformedFoods);
  } catch (error) {
    res.status(500).json({ 
      message: "Server Error", 
      error: error.message 
    });
  }
};

// @desc   Get food by ID
// @route  GET /api/foods/:id
// @access Public
export const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.json(food);
  } catch (error) {
    res.status(500).json({ 
      message: "Server Error", 
      error: error.message 
    });
  }
};
