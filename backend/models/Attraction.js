import mongoose from "mongoose";

const attractionSchema = new mongoose.Schema({
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
  rating: { 
    type: Number, 
    min: 0, 
    max: 5, 
    default: 4.5 
  },
  city: { 
    type: String 
  },
  tip: { 
    type: String 
  },
  location: { 
    type: String 
  },
  image: { 
    type: String, 
    required: true 
  }
}, { 
  collection: "attractions", 
  timestamps: true 
});

// Create indexes for faster searches
attractionSchema.index({ country: 1 });
attractionSchema.index({ city: 1 });
attractionSchema.index({ rating: -1 });

const Attraction = mongoose.model("Attraction", attractionSchema);

export default Attraction;
