"use client"

import { createContext, useState, useEffect, useContext } from "react"
import { AuthContext } from "./AuthContext"

export const MedicationContext = createContext()

export const MedicationProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext)
  const [medications, setMedications] = useState([])
  const [caregivers, setCaregivers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (currentUser) {
      // Load medications from localStorage
      const storedMedications = localStorage.getItem(`medications_${currentUser.id}`)
      if (storedMedications) {
        setMedications(JSON.parse(storedMedications))
      }

      // Load caregivers from localStorage
      const storedCaregivers = localStorage.getItem(`caregivers_${currentUser.id}`)
      if (storedCaregivers) {
        setCaregivers(JSON.parse(storedCaregivers))
      }
    } else {
      setMedications([])
      setCaregivers([])
    }
    setLoading(false)
  }, [currentUser])

  const saveMedications = (updatedMedications) => {
    if (currentUser) {
      setMedications(updatedMedications)
      localStorage.setItem(`medications_${currentUser.id}`, JSON.stringify(updatedMedications))
    }
  }

  const addMedication = (medication) => {
    const newMedication = {
      ...medication,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    const updatedMedications = [...medications, newMedication]
    saveMedications(updatedMedications)
    return newMedication
  }

  const updateMedication = (id, updatedMedication) => {
    const updatedMedications = medications.map((med) => (med.id === id ? { ...med, ...updatedMedication } : med))
    saveMedications(updatedMedications)
  }

  const deleteMedication = (id) => {
    const updatedMedications = medications.filter((med) => med.id !== id)
    saveMedications(updatedMedications)
  }

  const saveCaregivers = (updatedCaregivers) => {
    if (currentUser) {
      setCaregivers(updatedCaregivers)
      localStorage.setItem(`caregivers_${currentUser.id}`, JSON.stringify(updatedCaregivers))
    }
  }

  const addCaregiver = (caregiver) => {
    const newCaregiver = {
      ...caregiver,
      id: Date.now().toString(),
    }
    const updatedCaregivers = [...caregivers, newCaregiver]
    saveCaregivers(updatedCaregivers)
    return newCaregiver
  }

  const updateCaregiver = (id, updatedCaregiver) => {
    const updatedCaregivers = caregivers.map((cg) => (cg.id === id ? { ...cg, ...updatedCaregiver } : cg))
    saveCaregivers(updatedCaregivers)
  }

  const deleteCaregiver = (id) => {
    const updatedCaregivers = caregivers.filter((cg) => cg.id !== id)
    saveCaregivers(updatedCaregivers)
  }

  const checkMissedMedications = () => {
    const now = new Date()
    const missedMeds = medications.filter((med) => {
      const lastScheduledTime = new Date(med.lastScheduledTime)
      const timeDiff = now - lastScheduledTime
      const hoursDiff = timeDiff / (1000 * 60 * 60)

      return !med.lastTaken || (hoursDiff > med.frequency && med.active)
    })

    return missedMeds
  }

  const markMedicationAsTaken = (id) => {
    const updatedMedications = medications.map((med) => {
      if (med.id === id) {
        return {
          ...med,
          lastTaken: new Date().toISOString(),
          adherenceLog: [
            ...(med.adherenceLog || []),
            {
              date: new Date().toISOString(),
              taken: true,
            },
          ],
        }
      }
      return med
    })

    saveMedications(updatedMedications)
  }

  const value = {
    medications,
    addMedication,
    updateMedication,
    deleteMedication,
    caregivers,
    addCaregiver,
    updateCaregiver,
    deleteCaregiver,
    checkMissedMedications,
    markMedicationAsTaken,
    loading,
  }

  return <MedicationContext.Provider value={value}>{!loading && children}</MedicationContext.Provider>
}

