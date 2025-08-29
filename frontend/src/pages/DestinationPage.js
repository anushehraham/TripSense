import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCountryByName } from "../services/countryService";
import "../styles/CountryCard.css";

export default function DestinationPage() {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  const fallbackImage =
    "https://via.placeholder.com/600x400.png?text=No+Image+Available";

  useEffect(() => {
    const getCountry = async () => {
      try {
        const data = await fetchCountryByName(name);
        setCountry(data);
      } catch (error) {
        console.error("Error fetching country:", error);
      } finally {
        setLoading(false);
      }
    };
    getCountry();
  }, [name]);

  if (loading) return <p>Loading...</p>;
  if (!country) return <p>Country not found.</p>;

  return (
    <div className="country-card">
      <img src={country.image || fallbackImage} alt={country.name} />
      <div className="country-info">
        <h2>{country.name}</h2>
        <p>{country.description}</p>
      </div>
    </div>
  );
}