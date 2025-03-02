import { Link } from "react-router-dom"
import "../../styles/MedicationCard.css"

const MedicationCard = ({ medication, onTake, onEdit, onDelete, showActions = false, inactive = false }) => {
  const formatTime = (timeString) => {
    if (!timeString) return ""
    const date = new Date(timeString)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const getNextDoseText = () => {
    if (!medication.nextDoseTime) return "No scheduled dose"

    const nextDose = new Date(medication.nextDoseTime)
    const now = new Date()

    if (nextDose < now) {
      return "Dose missed"
    }

    const diffMs = nextDose - now
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

    if (diffHrs > 0) {
      return `Next dose in ${diffHrs}h ${diffMins}m`
    } else {
      return `Next dose in ${diffMins}m`
    }
  }

  return (
    <div className={`medication-card ${inactive ? "inactive" : ""}`}>
      <div className="medication-header">
        <h3>{medication.name}</h3>
        {showActions && (
          <div className="medication-actions">
            <Link to={`/medications/edit/${medication.id}`} className="edit-button">
              Edit
            </Link>
            <button onClick={() => onDelete(medication.id)} className="delete-button">
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="medication-details">
        <p className="dosage">{medication.dosage}</p>
        <p className="frequency">{medication.frequency}</p>
        {medication.instructions && <p className="instructions">{medication.instructions}</p>}

        <div className="date-range">
          <span>From: {formatDate(medication.startDate)}</span>
          {medication.endDate && <span>To: {formatDate(medication.endDate)}</span>}
        </div>

        {!inactive && (
          <div className="next-dose">
            <p>{getNextDoseText()}</p>
            {medication.nextDoseTime && <p className="time">{formatTime(medication.nextDoseTime)}</p>}
          </div>
        )}
      </div>

      {!inactive && onTake && (
        <button onClick={() => onTake(medication.id)} className="take-button">
          Mark as Taken
        </button>
      )}
    </div>
  )
}

export default MedicationCard

