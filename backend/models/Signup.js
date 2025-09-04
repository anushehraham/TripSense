import mongoose from 'mongoose';

const signupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create indexes for better performance
signupSchema.index({ email: 1 });
signupSchema.index({ createdAt: -1 });

const Signup = mongoose.model('Signup', signupSchema, 'signup');

export default Signup;
