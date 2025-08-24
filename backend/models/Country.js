// backend/models/Country.js
import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
}, { collection: "countries", timestamps: true });

const Country = mongoose.model("Country", countrySchema);
export default Country;
