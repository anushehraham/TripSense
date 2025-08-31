import mongoose from "mongoose";

const cultureSchema = new mongoose.Schema({
  country: { 
    type: String, 
    required: true 
  },
  aspect: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  tip: { 
    type: String, 
    required: true 
  }
}, { 
  collection: "culture", 
  timestamps: true 
});

// Create indexes for faster searches
cultureSchema.index({ country: 1 });
cultureSchema.index({ aspect: 1 });

const Culture = mongoose.model("Culture", cultureSchema);

export default Culture;
