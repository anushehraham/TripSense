// countryApi.js
export const searchCountry = async (query) => {
  try {
    const response = await fetch(`http://localhost:5000/api/countries/${query}`);
    if (!response.ok) {
      throw new Error("Country not found");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching country:", error);
    return null;
  }
};
