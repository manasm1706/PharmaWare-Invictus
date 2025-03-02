"use client"

import { useContext } from "react"
import { Link } from "react-router-dom"
import { MedicationContext } from "../../context/MedicationContext"
import { LanguageContext } from "../../context/LanguageContext"
import MedicationCard from "./MedicationCard"
import "../../styles/MedicationList.css"

const MedicationList = () => {
  const { medications, markMedicationAsTaken, deleteMedication } = useContext(MedicationContext)
  const { t } = useContext(LanguageContext)

  const activeMedications = medications.filter((med) => med.active)
  const inactiveMedications = medications.filter((med) => !med.active)

  return (
    <div className="medication-list-container">
      <div className="list-header">
        <h1>{t("medications")}</h1>
        <Link to="/medications/add" className="add-button">
          {t("addMedication")}
        </Link>
      </div>

      <div className="medications-section">
        <h2>{t("activeMedications")}</h2>
        {activeMedications.length > 0 ? (
          <div className="medications-grid">
            {activeMedications.map((medication) => (
              <MedicationCard
                key={medication.id}
                medication={medication}
                onTake={() => markMedicationAsTaken(medication.id)}
                onEdit={() => {}}
                onDelete={() => deleteMedication(medication.id)}
                showActions={true}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>{t("No Active Medications")}</p>
            <Link to="/medications/add" className="add-link">
              {t("addYourFirst")}
            </Link>
          </div>
        )}
      </div>

      {inactiveMedications.length > 0 && (
        <div className="medications-section">
          <h2>{t("inactiveMedications")}</h2>
          <div className="medications-grid">
            {inactiveMedications.map((medication) => (
              <MedicationCard
                key={medication.id}
                medication={medication}
                onEdit={() => {}}
                onDelete={() => deleteMedication(medication.id)}
                showActions={true}
                inactive={true}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MedicationList

