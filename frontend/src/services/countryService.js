import axios from "axios";

// Base API URL (adjust if backend runs on another port)
const API_URL = "http://localhost:5000/api/countries";

// Fetch all countries
export const fetchCountries = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Fetch country by name
export const fetchCountryByName = async (name) => {
  const response = await axios.get(`${API_URL}/${name}`);
  return response.data;
};
