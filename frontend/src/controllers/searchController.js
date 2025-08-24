export const handleSearch = (query) => {
  if (!query.trim()) {
    alert("Please enter a destination.");
    return;
  }
  console.log("Searching for:", query);
  // Later: connect to backend API to fetch destinations
};
