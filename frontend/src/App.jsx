import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import Dashboard from "./components/dashboard/Dashboard"
import MedicationForm from "./components/medications/MedicationForm"
import MedicationList from "./components/medications/MedicationList"
import MedicineSearch from "./components/medications/MedicineSearch"
import CaregiversList from "./components/caregivers/CaregiversList"
import CaregiversForm from "./components/caregivers/CaregiversForm"
import PharmacyFinder from "./components/pharmacy/PharmacyFinder"
import Settings from "./components/settings/Settings"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import { AuthProvider } from "./context/AuthContext"
import { MedicationProvider } from "./context/MedicationContext"
import { LanguageProvider } from "./context/LanguageContext"
import "./styles/App.css"

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <MedicationProvider>
          <Router>
            <div className="app-container">
              <Navbar />
              <main className="main-content">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/medications"
                    element={
                      <ProtectedRoute>
                        <MedicationList />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/medications/add"
                    element={
                      <ProtectedRoute>
                        <MedicationForm />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/medications/edit/:id"
                    element={
                      <ProtectedRoute>
                        <MedicationForm />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/caregivers"
                    element={
                      <ProtectedRoute>
                        <CaregiversList />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/caregivers/add"
                    element={
                      <ProtectedRoute>
                        <CaregiversForm />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pharmacy-finder"
                    element={
                      <ProtectedRoute>
                        <PharmacyFinder />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/medicinesearch"
                    element={
                      <ProtectedRoute>
                        <MedicineSearch />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/" element={<Navigate to="/login" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </MedicationProvider>
      </LanguageProvider>
    </AuthProvider>
  )
}

export default App

