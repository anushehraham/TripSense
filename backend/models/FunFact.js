import mongoose from 'mongoose';

const funFactSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    trim: true
  },
  funFact: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true,
  // Explicit collection name to match your existing Mongo collection (singular 'funfact')
  collection: 'funfact'
});

// Index for efficient queries
funFactSchema.index({ country: 1 });

const FunFact = mongoose.model('FunFact', funFactSchema);

export default FunFact;
