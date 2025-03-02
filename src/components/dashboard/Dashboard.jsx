"use client"

import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { MedicationContext } from "../../context/MedicationContext"
import { AuthContext } from "../../context/AuthContext"
import { LanguageContext } from "../../context/LanguageContext"
import MedicationCard from "../medications/MedicationCard"
import ReminderAlert from "../medications/ReminderAlert"
import AdherenceChart from "./AdherenceChart"
import "../../styles/Dashboard.css"

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext)
  const { medications, checkMissedMedications, markMedicationAsTaken } = useContext(MedicationContext)
  const { t } = useContext(LanguageContext)
  const [todaysMedications, setTodaysMedications] = useState([])
  const [missedMedications, setMissedMedications] = useState([])
  const [upcomingMedications, setUpcomingMedications] = useState([])
  const [adherenceRate, setAdherenceRate] = useState(0)
  const [showReminderAlert, setShowReminderAlert] = useState(false)
  const [currentReminder, setCurrentReminder] = useState(null)

  useEffect(() => {
    // Filter medications for today
    const now = new Date()
    const today = now.toISOString().split("T")[0]

    const todaysMeds = medications.filter((med) => {
      const startDate = new Date(med.startDate).toISOString().split("T")[0]
      const endDate = med.endDate ? new Date(med.endDate).toISOString().split("T")[0] : null

      return startDate <= today && (!endDate || endDate >= today) && med.active
    })

    setTodaysMedications(todaysMeds)

    // Check for missed medications
    const missed = checkMissedMedications()
    setMissedMedications(missed)

    // If there are missed medications, show the reminder alert
    if (missed.length > 0 && !showReminderAlert) {
      setCurrentReminder(missed[0])
      setShowReminderAlert(true)
    }

    // Calculate upcoming medications
    const upcoming = todaysMeds
      .filter((med) => {
        const nextDoseTime = new Date(med.nextDoseTime)
        return nextDoseTime > now
      })
      .sort((a, b) => {
        return new Date(a.nextDoseTime) - new Date(b.nextDoseTime)
      })

    setUpcomingMedications(upcoming)

    // Calculate adherence rate
    if (medications.length > 0) {
      const totalDoses = medications.reduce((total, med) => {
        return total + (med.adherenceLog ? med.adherenceLog.length : 0)
      }, 0)

      const takenDoses = medications.reduce((total, med) => {
        return total + (med.adherenceLog ? med.adherenceLog.filter((log) => log.taken).length : 0)
      }, 0)

      const rate = totalDoses > 0 ? (takenDoses / totalDoses) * 100 : 0
      setAdherenceRate(Math.round(rate))
    }

    // Set up reminder check interval
    const reminderInterval = setInterval(() => {
      const now = new Date()

      todaysMeds.forEach((med) => {
        const nextDoseTime = new Date(med.nextDoseTime)
        const timeDiff = nextDoseTime - now

        // If it's time for the medication (within 5 minutes)
        if (timeDiff >= 0 && timeDiff <= 5 * 60 * 1000) {
          setCurrentReminder(med)
          setShowReminderAlert(true)

          // Use the Web Speech API for voice reminders if enabled
          if (med.voiceReminders) {
            const utterance = new SpeechSynthesisUtterance(`Time to take your medication: ${med.name}, ${med.dosage}`)
            window.speechSynthesis.speak(utterance)
          }
        }
      })
    }, 60000) // Check every minute

    return () => {
      clearInterval(reminderInterval)
    }
  }, [medications, checkMissedMedications, showReminderAlert])

  const handleTakeMedication = (id) => {
    markMedicationAsTaken(id)
    setShowReminderAlert(false)

    // Find the next missed medication if any
    const remainingMissed = missedMedications.filter((med) => med.id !== id)
    if (remainingMissed.length > 0) {
      setCurrentReminder(remainingMissed[0])
      setShowReminderAlert(true)
    }
  }

  const handleDismissReminder = () => {
    setShowReminderAlert(false)
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>
          {t("welcomeBack")}, {currentUser.name}
        </h1>
        <div className="adherence-summary">
          <div className="adherence-rate">
            <h3>{t("adherenceRate")}</h3>
            <div className="rate-circle">
              <span>{adherenceRate}%</span>
            </div>
          </div>
        </div>
      </div>

      {showReminderAlert && currentReminder && (
        <ReminderAlert
          medication={currentReminder}
          onTake={() => handleTakeMedication(currentReminder.id)}
          onDismiss={handleDismissReminder}
        />
      )}

      <div className="dashboard-grid">
        <div className="dashboard-section">
          <div className="section-header">
            <h2>{t("todaysMedications")}</h2>
            <Link to="/medications/add" className="add-button">
              +
            </Link>
          </div>
          <div className="medications-list">
            {todaysMedications.length > 0 ? (
              todaysMedications.map((med) => (
                <MedicationCard key={med.id} medication={med} onTake={() => handleTakeMedication(med.id)} />
              ))
            ) : (
              <div className="empty-state">
                <p>{t("noMedications")}</p>
                <Link to="/medications/add" className="add-link">
                  {t("addYourFirst")}
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <h2>{t("upcomingDoses")}</h2>
          <div className="upcoming-list">
            {upcomingMedications.length > 0 ? (
              upcomingMedications.map((med) => (
                <div key={med.id} className="upcoming-item">
                  <div className="med-info">
                    <h3>{med.name}</h3>
                    <p>{med.dosage}</p>
                  </div>
                  <div className="time-info">
                    <p>{new Date(med.nextDoseTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>{t("noUpcomingDoses")}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-section full-width">
        <h2>{t("medicationHistory")}</h2>
        <AdherenceChart medications={medications} />
      </div>
    </div>
  )
}

export default Dashboard

