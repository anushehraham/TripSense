import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  country: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    default: "Traditional"
  },
  priceRange: { 
    type: String, 
    default: "Varies"
  },
  bestPlace: { 
    type: String, 
    default: "Local restaurants"
  },
  tip: { 
    type: String, 
    default: "Best enjoyed fresh and hot"
  },
  cuisine: { 
    type: String 
  },
  difficulty: { 
    type: String 
  },
  cookingTime: { 
    type: String 
  },
  ingredients: { 
    type: String 
  },
  season: { 
    type: String 
  },
  rating: { 
    type: Number, 
    min: 0, 
    max: 5, 
    default: 4.5 
  }
}, { 
  collection: "foods", 
  timestamps: true 
});

// Create index for faster country searches
foodSchema.index({ country: 1 });

const Food = mongoose.model("Food", foodSchema);

export default Food;
