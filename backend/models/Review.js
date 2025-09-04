import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  helpful: {
    type: Number,
    default: 0
  },
  notHelpful: {
    type: Number,
    default: 0
  },
  verified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for efficient queries
reviewSchema.index({ country: 1, createdAt: -1 });
reviewSchema.index({ user: 1 });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
