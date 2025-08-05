const mongoose = require('mongoose');
require('dotenv').config();
const Destination = require('./models/Destination');

const sampleDestinations = [
  {
    name: "Paris",
    country: "France",
    description:
      "It's the City of Light, Romance and Fashion — but it's also more. The capital of France entices visitors with the Eiffel Tower, Arc de Triomphe, and amazing art, food, and culture.",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Paris_Night.jpg",
    categories: [
      "Restaurants",
      "Attractions",
      "Cafes",
      "Photo spots",
      "Cheap eats",
      "Romantic places"
    ]
  },
  {
    name: "Tokyo",
    country: "Japan",
    description:
      "Tokyo is a vibrant city that seamlessly blends tradition with cutting-edge modernity, offering ancient temples, futuristic tech, and incredible cuisine.",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Tokyo_Montage_2015.jpg",
    categories: [
      "Sushi spots",
      "Anime attractions",
      "Temples",
      "Shopping",
      "Street food",
      "Nightlife"
    ]
  },
  {
    name: "New York",
    country: "USA",
    description:
      "The Big Apple is a global hub for culture, art, and finance, known for landmarks like the Statue of Liberty, Times Square, and Central Park.",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/NYC_Midtown_Skyline_at_night_-_Jan_2006_edit1.jpg",
    categories: [
      "Broadway shows",
      "Museums",
      "Parks",
      "Skyscrapers",
      "Pizza places",
      "Fashion districts"
    ]
  },
  {
    name: "Cape Town",
    country: "South Africa",
    description:
      "Cape Town offers breathtaking coastal scenery, iconic Table Mountain, and vibrant cultural experiences rooted in rich history.",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Table_Mountain_from_Bloubergstrand.jpg",
    categories: [
      "Nature reserves",
      "Beaches",
      "Hiking trails",
      "Wineries",
      "Cultural tours",
      "Photography"
    ]
  },
  {
    name: "Barcelona",
    country: "Spain",
    description:
      "Barcelona is known for Gaudí's stunning architecture, Mediterranean beaches, bustling markets, and lively tapas bars.",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Sagrada_Familia_01.jpg",
    categories: [
      "Architecture",
      "Tapas bars",
      "Museums",
      "Beach spots",
      "Art galleries",
      "Nightclubs"
    ]
  }
];

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    console.log("Connected to MongoDB");

    // Optional: clear existing destinations
    await Destination.deleteMany();

    // Insert sample destinations
    await Destination.insertMany(sampleDestinations);
    console.log("Sample destinations inserted");

    mongoose.disconnect();
  })
  .catch((err) => console.error("MongoDB connection error:", err));
