"use client"

import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { MedicationContext } from "../../context/MedicationContext"
import { LanguageContext } from "../../context/LanguageContext"
import "../../styles/CaregiversForm.css"

const CaregiversForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { caregivers, addCaregiver, updateCaregiver } = useContext(MedicationContext)
  const { t } = useContext(LanguageContext)

  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
    phone: "",
    email: "",
    notifyMissedDoses: true,
    notifyLowSupply: false,
    notifyRefills: false,
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (id) {
      const caregiver = caregivers.find((cg) => cg.id === id)
      if (caregiver) {
        setFormData(caregiver)
      }
    }
  }, [id, caregivers])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.phone.trim() && !formData.email.trim()) {
      newErrors.contact = "Either phone or email is required"
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    if (formData.phone && !/^\+?[\d\s()-]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone format"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    if (id) {
      updateCaregiver(id, formData)
    } else {
      addCaregiver(formData)
    }

    navigate("/caregivers")
  }

  return (
    <div className="caregiver-form-container">
      <h1>{id ? t("editCaregiver") : t("addCaregiver")}</h1>

      <form onSubmit={handleSubmit} className="caregiver-form">
        <div className="form-group">
          <label htmlFor="name">{t("name")}</label>
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
          <label htmlFor="relationship">
            {t("relationship")} ({t("optional")})
          </label>
          <input
            type="text"
            id="relationship"
            name="relationship"
            value={formData.relationship}
            onChange={handleChange}
            placeholder="e.g., Spouse, Child, Friend"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">{t("phone")}</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className={errors.phone ? "error" : ""}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">{t("email")}</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
            className={errors.email ? "error" : ""}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
          {errors.contact && <span className="error-message">{errors.contact}</span>}
        </div>

        <div className="form-group notification-settings">
          <h3>{t("notificationSettings")}</h3>

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="notifyMissedDoses"
                checked={formData.notifyMissedDoses}
                onChange={handleChange}
              />
              {t("notifyMissedDoses")}
            </label>
          </div>

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="notifyLowSupply"
                checked={formData.notifyLowSupply}
                onChange={handleChange}
              />
              {t("notifyLowSupply")}
            </label>
          </div>

          <div className="checkbox-group">
            <label>
              <input type="checkbox" name="notifyRefills" checked={formData.notifyRefills} onChange={handleChange} />
              {t("notifyRefills")}
            </label>
          </div>
        </div>

        <div className="form-buttons">
          <button type="button" className="cancel-button" onClick={() => navigate("/caregivers")}>
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

export default CaregiversForm

