import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCountryByName } from "../services/countryService";

export default function DestinationPage() {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <div className="destination-page">
      <h2>{country.name}</h2>
      <img src={country.image} alt={country.name} width="400" />
      <p>{country.description}</p>
    </div>
  );
}
