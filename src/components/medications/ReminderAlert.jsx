"use client"

import { useEffect } from "react"
import "../../styles/ReminderAlert.css"

const ReminderAlert = ({ medication, onTake, onDismiss }) => {
  useEffect(() => {
    // Play sound for the reminder
    const audio = new Audio("/notification-sound.mp3")
    audio.play().catch((e) => console.log("Error playing sound:", e))

    // Vibrate if supported
    if ("vibrate" in navigator) {
      navigator.vibrate([200, 100, 200])
    }

    // Auto-dismiss after 1 minute if not interacted with
    const timeout = setTimeout(() => {
      onDismiss()
    }, 60000)

    return () => {
      clearTimeout(timeout)
    }
  }, [onDismiss])

  return (
    <div className="reminder-alert">
      <div className="reminder-content">
        <div className="reminder-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </div>
        <div className="reminder-details">
          <h3>Medication Reminder</h3>
          <p className="med-name">{medication.name}</p>
          <p className="med-dosage">{medication.dosage}</p>
          {medication.instructions && <p className="med-instructions">{medication.instructions}</p>}
        </div>
        <div className="reminder-actions">
          <button onClick={onTake} className="take-button">
            Mark as Taken
          </button>
          <button onClick={onDismiss} className="dismiss-button">
            Dismiss
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReminderAlert

