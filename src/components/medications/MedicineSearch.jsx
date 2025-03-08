import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/MedicineSearch.css";

const MedicineSearch = () => {
  const [medicineName, setMedicineName] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  // Function to fetch medicine details from FDA API
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
        `https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${encodedMedicineName}"&limit=5`
      );
  
      if (!response.ok) {
        throw new Error("API request failed");
      }
  
      const data = await response.json();
      if (!data.results || data.results.length === 0) {
        setError("No results found.");
        setLoading(false);
        return;
      }
  
      const extractedData = data.results.map((med) => ({
        name: med.openfda?.brand_name?.[0] || "Unknown",
        disease: formatUsage(med.indications_and_usage?.[0] || "Not specified"),
        form: med.openfda?.dosage_form?.[0] || "Tablets",
      }));
  
      const uniqueMedicines = Array.from(new Map(extractedData.map(m => [m.name.toLowerCase(), m])).values());
  
      setResults(uniqueMedicines.length ? uniqueMedicines : []);
      if (uniqueMedicines.length === 0) {
        setError("No exact matches found.");
      } else {
        fetchMedicineImages(uniqueMedicines);
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatUsage = (text) => {
    if (!text) return "Not specified";
  
    text = text.replace(/ask your doctor about other uses.*/gi, "").trim();
    text = text.replace(/because of its delayed action.*/gi, "").trim();
    
    text = text.replace(/\. /g, ".<br />");
  
    return text;
  };
  
  

  const fetchMedicineImages = async (medicines) => {
    try {
      const updatedResults = await Promise.all(
        medicines.map(async (medicine) => {
          const imageUrl = await getMedicineImage(medicine.name);
          return { ...medicine, imgUrl: imageUrl };
        })
      );
      setResults(updatedResults);
    } catch {
      setError("Could not fetch images.");
    }
  };

  const getMedicineImage = async (medicineName) => {
    try {
      const imageResponse = await fetch(
        `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(medicineName)}&cx=${GOOGLE_CSE_ID}&searchType=image&key=${GOOGLE_API_KEY}&num=1`
      );

      const imageData = await imageResponse.json();
      return imageData.items?.[0]?.link || "https://via.placeholder.com/150"; // Default image if none found
    } catch {
      return "https://via.placeholder.com/150";
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
            <div 
              key={index} 
              className="medicine-card"
              onClick={() => navigate(`/medicine/${encodeURIComponent(medicine.name)}`)} // 
              style={{ cursor: "pointer" }} 
            >
              <div className="medicine-img">
                <img src={medicine.imgUrl} alt={`${medicine.name} Image`} />
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