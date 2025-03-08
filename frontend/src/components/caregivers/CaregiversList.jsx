"use client"

import { useContext } from "react"
import { Link } from "react-router-dom"
import { MedicationContext } from "../../context/MedicationContext"
import { LanguageContext } from "../../context/LanguageContext"
import "../../styles/CaregiversList.css"

const CaregiversList = () => {
  const { caregivers, deleteCaregiver } = useContext(MedicationContext)
  const { t } = useContext(LanguageContext)

  return (
    <div className="caregivers-list-container">
      <div className="list-header">
        <h1>{t("caregivers")}</h1>
        <Link to="/caregivers/add" className="add-button">
          {t("addCaregiver")}
        </Link>
      </div>

      {caregivers.length > 0 ? (
        <div className="caregivers-grid">
          {caregivers.map((caregiver) => (
            <div key={caregiver.id} className="caregiver-card">
              <div className="caregiver-header">
                <h3>{caregiver.name}</h3>
                <div className="caregiver-actions">
                  <Link to={`/caregivers/edit/${caregiver.id}`} className="edit-button">
                    {t("edit")}
                  </Link>
                  <button
                    onClick={() => {
                      if (window.confirm(t("confirmDeleteCaregiver"))) {
                        deleteCaregiver(caregiver.id)
                      }
                    }}
                    className="delete-button"
                  >
                    {t("delete")}
                  </button>
                </div>
              </div>

              <div className="caregiver-details">
                <p className="relationship">{caregiver.relationship}</p>
                <p className="contact">
                  <span className="label">{t("phone")}:</span> {caregiver.phone}
                </p>
                <p className="contact">
                  <span className="label">{t("email")}:</span> {caregiver.email}
                </p>
                <div className="notification-settings">
                  <p className="label">{t("notificationSettings")}:</p>
                  <ul>
                    {caregiver.notifyMissedDoses && <li>{t("missedDoses")}</li>}
                    {caregiver.notifyLowSupply && <li>{t("lowSupply")}</li>}
                    {caregiver.notifyRefills && <li>{t("refillReminders")}</li>}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>{t("noCaregivers")}</p>
          <Link to="/caregivers/add" className="add-link">
            {t("addYourFirst")}
          </Link>
        </div>
      )}
    </div>
  )
}

export default CaregiversList

