const express = require('express');
const router = express.Router();
const Destination = require('../models/Destination');

// Search destinations
router.get('/search', async (req, res) => {
  const query = req.query.q?.toLowerCase();
  try {
    const results = await Destination.find({
      name: { $regex: query, $options: 'i' }
    });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;


const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: String,
  country: String,
  description: String,
});

module.exports = mongoose.model('Destination', destinationSchema);
