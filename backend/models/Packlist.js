import mongoose from 'mongoose';

const packlistSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  items: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      default: 'General',
      trim: true
    },
    quantity: {
      type: Number,
      default: 1
    },
    packed: {
      type: Boolean,
      default: false
    }
  }],
  title: {
    type: String,
    default: 'My Packing List',
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
packlistSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create indexes for better performance
packlistSchema.index({ userId: 1 });
packlistSchema.index({ createdAt: -1 });

const Packlist = mongoose.model('Packlist', packlistSchema, 'packlist');

export default Packlist;
