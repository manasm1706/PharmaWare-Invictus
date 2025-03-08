"use client"

import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { MedicationContext } from "../../context/MedicationContext"
import { LanguageContext } from "../../context/LanguageContext"
import "../../styles/MedicationForm.css"

const MedicationForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { medications, addMedication, updateMedication } = useContext(MedicationContext)
  const { t } = useContext(LanguageContext)

  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    frequency: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    instructions: "",
    reminderTimes: ["08:00"],
    active: true,
    voiceReminders: false,
    notifyCaregivers: false,
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (id) {
      const medication = medications.find((med) => med.id === id)
      if (medication) {
        // Format dates for the form
        const formattedMed = {
          ...medication,
          startDate: new Date(medication.startDate).toISOString().split("T")[0],
          endDate: medication.endDate ? new Date(medication.endDate).toISOString().split("T")[0] : "",
          reminderTimes: medication.reminderTimes || ["08:00"],
        }
        setFormData(formattedMed)
      }
    }
  }, [id, medications])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleReminderTimeChange = (index, value) => {
    const updatedTimes = [...formData.reminderTimes]
    updatedTimes[index] = value
    setFormData({
      ...formData,
      reminderTimes: updatedTimes,
    })
  }

  const addReminderTime = () => {
    setFormData({
      ...formData,
      reminderTimes: [...formData.reminderTimes, "08:00"],
    })
  }

  const removeReminderTime = (index) => {
    const updatedTimes = formData.reminderTimes.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      reminderTimes: updatedTimes,
    })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Medication name is required"
    }

    if (!formData.dosage.trim()) {
      newErrors.dosage = "Dosage is required"
    }

    if (!formData.frequency.trim()) {
      newErrors.frequency = "Frequency is required"
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required"
    }

    if (formData.endDate && new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.endDate = "End date must be after start date"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Calculate next dose time based on reminder times
    const now = new Date()
    const todayDate = now.toISOString().split("T")[0]

    let nextDoseTime = null
    if (formData.reminderTimes.length > 0) {
      // Sort reminder times
      const sortedTimes = [...formData.reminderTimes].sort()

      // Find the next reminder time today
      for (const time of sortedTimes) {
        const [hours, minutes] = time.split(":").map(Number)
        const reminderDate = new Date(now)
        reminderDate.setHours(hours, minutes, 0, 0)

        if (reminderDate > now) {
          nextDoseTime = reminderDate.toISOString()
          break
        }
      }

      // If no reminder time is found for today, use the first one for tomorrow
      if (!nextDoseTime) {
        const [hours, minutes] = sortedTimes[0].split(":").map(Number)
        const tomorrowDate = new Date(now)
        tomorrowDate.setDate(tomorrowDate.getDate() + 1)
        tomorrowDate.setHours(hours, minutes, 0, 0)
        nextDoseTime = tomorrowDate.toISOString()
      }
    }

    const medicationData = {
      ...formData,
      nextDoseTime,
      lastScheduledTime: now.toISOString(),
    }

    if (id) {
      updateMedication(id, medicationData)
    } else {
      addMedication(medicationData)
    }

    navigate("/medications")
  }

  return (
    <div className="medication-form-container">
      <h1>{id ? t("editMedication") : t("addMedication")}</h1>

      <form onSubmit={handleSubmit} className="medication-form">
        <div className="form-group">
          <label htmlFor="name">{t("medicationName")}</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "error" : ""}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="dosage">{t("dosage")}</label>
          <input
            type="text"
            id="dosage"
            name="dosage"
            value={formData.dosage}
            onChange={handleChange}
            placeholder="e.g., 1 tablet, 5ml"
            className={errors.dosage ? "error" : ""}
          />
          {errors.dosage && <span className="error-message">{errors.dosage}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="frequency">{t("frequency")}</label>
          <select
            id="frequency"
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            className={errors.frequency ? "error" : ""}
          >
            <option value="">{t("selectFrequency")}</option>
            <option value="once">Once daily</option>
            <option value="twice">Twice daily</option>
            <option value="three">Three times daily</option>
            <option value="four">Four times daily</option>
            <option value="asNeeded">As needed</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          {errors.frequency && <span className="error-message">{errors.frequency}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startDate">{t("startDate")}</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className={errors.startDate ? "error" : ""}
            />
            {errors.startDate && <span className="error-message">{errors.startDate}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="endDate">
              {t("endDate")} ({t("optional")})
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className={errors.endDate ? "error" : ""}
            />
            {errors.endDate && <span className="error-message">{errors.endDate}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="instructions">
            {t("instructions")} ({t("optional")})
          </label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            placeholder="e.g., Take with food"
          />
        </div>

        <div className="form-group">
          <label>{t("reminderTimes")}</label>
          {formData.reminderTimes.map((time, index) => (
            <div key={index} className="reminder-time-row">
              <input type="time" value={time} onChange={(e) => handleReminderTimeChange(index, e.target.value)} />
              {formData.reminderTimes.length > 1 && (
                <button type="button" className="remove-time-button" onClick={() => removeReminderTime(index)}>
                  &times;
                </button>
              )}
            </div>
          ))}
          <button type="button" className="add-time-button" onClick={addReminderTime}>
            + {t("addReminderTime")}
          </button>
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input type="checkbox" name="active" checked={formData.active} onChange={handleChange} />
            {t("activeMedication")}
          </label>
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input type="checkbox" name="voiceReminders" checked={formData.voiceReminders} onChange={handleChange} />
            {t("enableVoiceReminders")}
          </label>
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="notifyCaregivers"
              checked={formData.notifyCaregivers}
              onChange={handleChange}
            />
            {t("notifyCaregivers")}
          </label>
        </div>

        <div className="form-buttons">
          <button type="button" className="cancel-button" onClick={() => navigate("/medications")}>
            {t("cancel")}
          </button>
          <button type="submit" className="save-button">
            {t("save")}
          </button>
        </div>
      </form>
    </div>
  )
}

export default MedicationForm

