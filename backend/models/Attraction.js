import mongoose from "mongoose";

const attractionSchema = new mongoose.Schema({
  countries: [{
    name: { 
      type: String, 
      required: true 
    },
    slug: { 
      type: String, 
      required: true 
    },
    attractions: [{
      title: { 
        type: String, 
        required: true 
      },
      city: { 
        type: String 
      },
      description: { 
        type: String, 
        required: true 
      },
      image: { 
        type: String, 
        required: true 
      },
      rating: { 
        type: Number, 
        min: 0, 
        max: 5, 
        default: 4.5 
      },
      bestTime: { 
        type: String, 
        default: "All day"
      },
      tips: { 
        type: String, 
        default: "Visit during off-peak hours for better experience"
      },
      location: { 
        type: String 
      },
      category: { 
        type: String 
      },
      price: { 
        type: String 
      },
      openingHours: { 
        type: String 
      },
      contact: { 
        type: String 
      },
      website: { 
        type: String 
      }
    }]
  }]
}, { 
  collection: "attractions", 
  timestamps: true 
});

// Create index for faster country name searches within the countries array
attractionSchema.index({ "countries.name": 1 });

const Attraction = mongoose.model("Attraction", attractionSchema);

export default Attraction;
