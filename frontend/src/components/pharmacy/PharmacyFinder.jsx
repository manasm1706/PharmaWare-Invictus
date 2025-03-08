"use client"

import { useState, useEffect, useContext } from "react"
import { MedicationContext } from "../../context/MedicationContext"
import { LanguageContext } from "../../context/LanguageContext"
import "../../styles/PharmacyFinder.css"

const PharmacyFinder = () => {
  const { medications } = useContext(MedicationContext)
  const { t } = useContext(LanguageContext)

  const [location, setLocation] = useState("")
  const [selectedMedication, setSelectedMedication] = useState("")
  const [pharmacies, setPharmacies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [userLocation, setUserLocation] = useState(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }
  }, [])

  const fetchPharmacies = async (query) => {
    try {
      setLoading(true)
      setError("")
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=pharmacy+in+${encodeURIComponent(query)}`
      )
      const data = await response.json()

      const formattedPharmacies = data.map((item) => ({
        id: item.place_id,
        name: item.name || "Unknown Pharmacy",
        address: item.display_name,
        phone: "N/A",
        distance: "N/A",
        hours: "N/A",
        isOpen: true, 
        hasStock: true,
        website: "",
        lat: item.lat,
        lon: item.lon,
      }))

      setPharmacies(formattedPharmacies)
    } catch (err) {
      setError("Failed to fetch pharmacies. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (location) {
      fetchPharmacies(location)
    }
  }

  const getDirections = (lat, lon, address) => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${lat},${lon}`
      window.open(url, "_blank")
    } else {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
      window.open(url, "_blank")
    }
  }

  return (
    <div className="pharmacy-finder-container">
      <h1>{t("pharmacyFinder")}</h1>

      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <div className="form-group">
            <label htmlFor="location">{t("location")}</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={userLocation ? t("usingCurrentLocation") : t("Enter Location")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="medication">{t("medication")}</label>
            <select id="medication" value={selectedMedication} onChange={(e) => setSelectedMedication(e.target.value)}>
              <option value="">{t("All Medications")}</option>
              {medications.map((med) => (
                <option key={med.id} value={med.id}>
                  {med.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="search-button">
            {t("searchPharmacies")}
          </button>
        </form>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>{t("Searching Pharmacies")}</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <p>{error}</p>
        </div>
      ) : pharmacies.length > 0 ? (
        <div className="results-section">
          <h2>{t("Nearby Pharmacies")}</h2>

          <div className="pharmacies-list">
            {pharmacies.map((pharmacy) => (
              <div key={pharmacy.id} className="pharmacy-card">
                <div className="pharmacy-header">
                  <h3>{pharmacy.name}</h3>
                  <span className={`status ${pharmacy.isOpen ? "open" : "closed"}`}>
                    {pharmacy.isOpen ? t("open") : t("closed")}
                  </span>
                </div>

                <div className="pharmacy-details">
                  <p className="address">{pharmacy.address}</p>
                  <p className="hours">
                    {t("hours")}: {pharmacy.hours}
                  </p>
                </div>

                <div className="pharmacy-actions">
                  <button onClick={() => getDirections(pharmacy.lat, pharmacy.lon, pharmacy.address)} className="directions-button">
                    {t("Get Directions")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <p>{t("Search For Pharmacies")}</p>
        </div>
      )}
    </div>
  )
}

export default PharmacyFinder
