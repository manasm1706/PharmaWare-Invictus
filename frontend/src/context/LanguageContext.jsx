"use client"

import { createContext, useState, useEffect } from "react"

export const LanguageContext = createContext()

const translations = {
  en: {
    appName: "PharmaWare",
    login: "Login",
    register: "Register",
    dashboard: "Dashboard",
    medications: "Medications",
    addMedication: "Add Medication",
    editMedication: "Edit Medication",
    caregivers: "Caregivers",
    addCaregiver: "Add Caregiver",
    pharmacyFinder: "Pharmacy Finder",
    settings: "Settings",
    logout: "Logout",
    email: "Email",
    password: "Password",
    name: "Name",
    phone: "Phone",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    confirmDelete: "Are you sure you want to delete this?",
    medicationName: "Medication Name",
    dosage: "Dosage",
    frequency: "Frequency",
    startDate: "Start Date",
    endDate: "End Date",
    instructions: "Instructions",
    reminderTime: "Reminder Time",
    markAsTaken: "Mark as Taken",
    missedDose: "Missed Dose",
    nextDose: "Next Dose",
    caregiversContact: "Caregiver Contact",
    notifyCaregiver: "Notify Caregiver",
    findPharmacy: "Find Pharmacy",
    language: "Language",
    voiceReminders: "Voice Reminders",
    textSize: "Text Size",
    highContrast: "High Contrast",
    dataPrivacy: "Data Privacy",
    exportData: "Export Data",
    importData: "Import Data",
    deleteAccount: "Delete Account",
    welcomeBack: "Welcome back",
    todaysMedications: "Today's Medications",
    upcomingDoses: "Upcoming Doses",
    adherenceRate: "Adherence Rate",
    medicationHistory: "Medication History",
    noMedications: "No medications found",
    noCaregivers: "No caregivers found",
    addYourFirst: "Add your first one",
    searchPharmacies: "Search Pharmacies",
    nearbyPharmacies: "Nearby Pharmacies",
    distance: "Distance",
    directions: "Directions",
    call: "Call",
    website: "Website",
    hours: "Hours",
    closed: "Closed",
    open: "Open",
    stockAvailability: "Stock Availability",
    checkStock: "Check Stock",
    inStock: "In Stock",
    outOfStock: "Out of Stock",
    alternativePharmacies: "Alternative Pharmacies",
    reminderSettings: "Reminder Settings",
    notificationSound: "Notification Sound",
    vibration: "Vibration",
    advancedReminders: "Advanced Reminders",
    reminderLeadTime: "Reminder Lead Time",
    persistentReminders: "Persistent Reminders",
    smartReminders: "Smart Reminders",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    help: "Help",
    about: "About",
    version: "Version",
    contactSupport: "Contact Support",
  },
  es: {
    appName: "Compañero de Adherencia a Medicamentos",
    login: "Iniciar Sesión",
    register: "Registrarse",
    dashboard: "Panel Principal",
    medications: "Medicamentos",
    addMedication: "Añadir Medicamento",
    editMedication: "Editar Medicamento",
    caregivers: "Cuidadores",
    addCaregiver: "Añadir Cuidador",
    pharmacyFinder: "Buscador de Farmacias",
    settings: "Configuración",
    logout: "Cerrar Sesión",
  },
  hi: {
    appName: "दवा अनुपालन साथी",
    login: "लॉग इन करें",
    register: "पंजीकरण करें",
    dashboard: "डैशबोर्ड",
    medications: "दवाएं",
    addMedication: "दवा जोड़ें",
    editMedication: "दवा संपादित करें",
    caregivers: "देखभालकर्ता",
    addCaregiver: "देखभालकर्ता जोड़ें",
    pharmacyFinder: "फार्मेसी खोजक",
    settings: "सेटिंग्स",
    logout: "लॉग आउट",
  },
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en")

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language")
    if (storedLanguage && translations[storedLanguage]) {
      setLanguage(storedLanguage)
    }
  }, [])

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang)
      localStorage.setItem("language", lang)
    }
  }

  const t = (key) => {
    return translations[language]?.[key] || key
  }

  const value = {
    language,
    changeLanguage,
    t,
    availableLanguages: Object.keys(translations),
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
