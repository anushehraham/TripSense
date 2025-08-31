// countryApi.js
export const searchCountry = async (query) => {
  try {
    console.log("API call to:", `http://localhost:5000/api/countries/${query}`);
    const response = await fetch(`http://localhost:5000/api/countries/${query}`);
    console.log("API response status:", response.status);
    
    if (!response.ok) {
      throw new Error(`Country not found: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("API response data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching country:", error);
    return null;
  }
};
