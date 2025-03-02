"use client"

import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { LanguageContext } from "../../context/LanguageContext"
import "../../styles/Settings.css"

const Settings = () => {
  const { currentUser, logout } = useContext(AuthContext)
  const { language, changeLanguage, availableLanguages, t } = useContext(LanguageContext)
  const navigate = useNavigate()

  const [settings, setSettings] = useState({
    textSize: "medium",
    highContrast: false,
    notificationSound: true,
    vibration: true,
    voiceReminders: false,
    reminderLeadTime: "15",
    persistentReminders: true,
    dataExport: false,
  })

  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleLanguageChange = (e) => {
    changeLanguage(e.target.value)
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const handleDeleteAccount = () => {
    setShowConfirmation(true)
  }

  const confirmDeleteAccount = () => {
    // In a real app, this would make an API call to delete the account
    logout()
    navigate("/login")
  }

  const cancelDeleteAccount = () => {
    setShowConfirmation(false)
  }

  const exportData = () => {
    // In a real app, this would generate a file with the user's data
    const userData = {
      user: currentUser,
      settings: settings,
      // Other data would be included here
    }

    const dataStr = JSON.stringify(userData, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = "medication-data.json"

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  return (
    <div className="settings-container">
      <h1>{t("settings")}</h1>

      <div className="settings-section">
        <h2>{t("accountSettings")}</h2>

        <div className="setting-item">
          <div className="setting-info">
            <h3>{t("email")}</h3>
            <p>{currentUser.email}</p>
          </div>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h3>{t("name")}</h3>
            <p>{currentUser.name}</p>
          </div>
          <button className="edit-button">{t("edit")}</button>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h3>{t("password")}</h3>
            <p>********</p>
          </div>
          <button className="edit-button">{t("change")}</button>
        </div>
      </div>

      <div className="settings-section">
        <h2>{t("displaySettings")}</h2>

        <div className="setting-item">
          <div className="setting-info">
            <h3>{t("language")}</h3>
          </div>
          <select value={language} onChange={handleLanguageChange} className="setting-select">
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="hi">हिन्दी</option>
          </select>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h3>{t("textSize")}</h3>
          </div>
          <select name="textSize" value={settings.textSize} onChange={handleChange} className="setting-select">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="extra-large">Extra Large</option>
          </select>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h3>{t("highContrast")}</h3>
           
          </div>
          <label className="toggle-switch">
            <input type="checkbox" name="highContrast" checked={settings.highContrast} onChange={handleChange} />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h2>{t("reminderSettings")}</h2>

        <div className="setting-item">
          <div className="setting-info">
            <h3>{t("notificationSound")}</h3>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              name="notificationSound"
              checked={settings.notificationSound}
              onChange={handleChange}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h3>{t("vibration")}</h3>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" name="vibration" checked={settings.vibration} onChange={handleChange} />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h3>{t("voiceReminders")}</h3>
           
          </div>
          <label className="toggle-switch">
            <input type="checkbox" name="voiceReminders" checked={settings.voiceReminders} onChange={handleChange} />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h3>{t("reminderLeadTime")}</h3>
    
          </div>
          <select
            name="reminderLeadTime"
            value={settings.reminderLeadTime}
            onChange={handleChange}
            className="setting-select"
          >
            <option value="5">5 minutes</option>
            <option value="10">10 minutes</option>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
          </select>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h3>{t("persistentReminders")}</h3>
           
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              name="persistentReminders"
              checked={settings.persistentReminders}
              onChange={handleChange}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h2>{t("dataPrivacy")}</h2>

        <div className="setting-item">
          <div className="setting-info">
            <h3>{t("exportData")}</h3>
         
          </div>
          <button onClick={exportData} className="action-button">
            {t("export")}
          </button>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h3>{t("importData")}</h3>
            
          </div>
          <button className="action-button">{t("import")}</button>
        </div>
      </div>

      <div className="settings-section danger-zone">
        <h2>{t("dangerZone")}</h2>

        <div className="setting-item">
          <div className="setting-info">
            <h3>{t("log out")}</h3>
           
          </div>
          <button onClick={handleLogout} className="danger-button">
            {t("logout")}
          </button>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h3>{t("deleteAccount")}</h3>
          
          </div>
          <button onClick={handleDeleteAccount} className="danger-button">
            {t("deleteAccount")}
          </button>
        </div>
      </div>

      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <h2>{t("Confirm Delete Account")}</h2>
            <p>{t("Delete Account Warning")}</p>
            <div className="modal-actions">
              <button onClick={cancelDeleteAccount} className="cancel-button">
                {t("cancel")}
              </button>
              <button onClick={confirmDeleteAccount} className="confirm-button">
                {t("confirm")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings

