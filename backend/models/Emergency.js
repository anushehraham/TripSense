import mongoose from 'mongoose';

const emergencySchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    index: true
  },
  emergencyNumbers: {
    police: {
      type: String,
      required: true
    },
    ambulance: {
      type: String,
      required: true
    },
    fire: {
      type: String,
      required: true
    },
    general: {
      type: String,
      required: true
    }
  },
  embassy: {
    address: String,
    phone: String,
    email: String
  },
  hospitals: [{
    name: String,
    address: String,
    phone: String
  }],
  tips: [String]
}, {
  timestamps: true
});

// Explicitly set collection name
const Emergency = mongoose.model('Emergency', emergencySchema, 'emergency');

export default Emergency;
