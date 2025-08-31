import mongoose from "mongoose";

const bestTimeSchema = new mongoose.Schema({
  country: { 
    type: String, 
    required: true 
  },
  bestTime: { 
    type: String, 
    required: true 
  },
  details: { 
    type: String, 
    required: true 
  },
  tip: { 
    type: String, 
    required: true 
  }
}, { 
  collection: "besttime", 
  timestamps: true 
});

// Create indexes for faster searches
bestTimeSchema.index({ country: 1 });

const BestTime = mongoose.model("BestTime", bestTimeSchema);

export default BestTime;
