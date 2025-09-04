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
  timestamps: true
});

// Index for efficient queries
funFactSchema.index({ country: 1 });

const FunFact = mongoose.model('FunFact', funFactSchema);

export default FunFact;
