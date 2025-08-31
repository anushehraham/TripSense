import mongoose from "mongoose";

const localPhraseSchema = new mongoose.Schema({
  country: { 
    type: String, 
    required: true 
  },
  phrase: { 
    type: String, 
    required: true 
  },
  translation: { 
    type: String, 
    required: true 
  },
  usage: { 
    type: String, 
    required: true 
  }
}, { 
  collection: "localphrase", 
  timestamps: true 
});

// Create indexes for faster searches
localPhraseSchema.index({ country: 1 });
localPhraseSchema.index({ phrase: 1 });

const LocalPhrase = mongoose.model("LocalPhrase", localPhraseSchema);

export default LocalPhrase;
