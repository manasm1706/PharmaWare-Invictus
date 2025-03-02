import React, { useState } from "react";
import "../../styles/MedicineSearch.css";

const MedicineSearch = () => {
  const [medicineName, setMedicineName] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMedicineData = async () => {
    if (!medicineName.trim()) {
      setError("Please enter a medicine name.");
      return;
    }
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const encodedMedicineName = encodeURIComponent(medicineName);
      const response = await fetch(
        `https://api.fda.gov/drug/event.json?search=patient.drug.medicinalproduct:"${encodedMedicineName}"&limit=5`
      );

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      const searchLower = medicineName.toLowerCase();

      if (data.results && data.results.length > 0) {
        const extractedData = data.results.flatMap((report) =>
          report.patient?.drug
            ?.filter((drug) => drug.medicinalproduct?.toLowerCase() === searchLower)
            .map((drug) => ({
              name: drug.medicinalproduct,
              disease: drug.drugindication || "Not specified",
              form: drug.drugdosageform || "Unknown",
              imgUrl: `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(drug.medicinalproduct)}`, // Google Image Search
            }))
        );

        const uniqueMedicines = Array.from(new Map(extractedData.map(m => [m.name.toLowerCase(), m])).values());

        setResults(uniqueMedicines.length ? uniqueMedicines : []);
        if (uniqueMedicines.length === 0) {
          setError("No exact matches found.");
        }
      } else {
        setError("No results found.");
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="medicine-search-container">
      <h2>Medicine Search</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter medicine name..."
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
        />
        <button onClick={fetchMedicineData}>Search</button>
      </div>

      {loading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">{error}</p>}

      <div className="medicine-results">
        {results.length > 0 &&
          results.map((medicine, index) => (
            <div key={index} className="medicine-card">
              <div className="medicine-img">
                <a href={medicine.imgUrl} target="_blank" rel="noopener noreferrer">
                  <img src="https://via.placeholder.com/100" alt={`${medicine.name} Image`} />
                </a>
              </div>
              <div className="medicine-info">
                <h3>{medicine.name}</h3>
                <p><strong>Used for:</strong> {medicine.disease}</p>
                <p><strong>Form:</strong> {medicine.form}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MedicineSearch;
