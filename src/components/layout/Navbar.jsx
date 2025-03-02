"use client"

import { useState, useContext } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { LanguageContext } from "../../context/LanguageContext"
import "../../styles/Navbar.css"

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext)
  const { t } = useContext(LanguageContext)
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
    closeMenu()
  }

  if (!currentUser) {
    return null
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          {t("appName")}
        </Link>

        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={`menu-icon ${menuOpen ? "open" : ""}`}></span>
        </button>

        <div className={`navbar-menu ${menuOpen ? "open" : ""}`}>
          <ul className="navbar-links">
            <li>
              <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""} onClick={closeMenu}>
                {t("dashboard")}
              </Link>
            </li>
            <li>
              <Link
                to="/medications"
                className={location.pathname.includes("/medications") ? "active" : ""}
                onClick={closeMenu}
              >
                {t("medications")}
              </Link>
            </li>
            <li>
              <Link
                to="/caregivers"
                className={location.pathname.includes("/caregivers") ? "active" : ""}
                onClick={closeMenu}
              >
                {t("caregivers")}
              </Link>
            </li>
            <li>
              <Link
                to="/pharmacy-finder"
                className={location.pathname === "/pharmacy-finder" ? "active" : ""}
                onClick={closeMenu}
              >
                {t("pharmacyFinder")}
              </Link>
            </li>
            <li>
              <Link to="/settings" className={location.pathname === "/settings" ? "active" : ""} onClick={closeMenu}>
                {t("settings")}
              </Link>
            </li>
            <li>
              <Link
                to="/medicinesearch"
                className={location.pathname === "/medicinesearch" ? "active" : ""}
                onClick={closeMenu}
              >
                Medicine Search
              </Link>
            </li>

          </ul>

          <div className="navbar-user">
            <span className="user-name">{currentUser.name}</span>
            <button onClick={handleLogout} className="logout-button">
              {t("logout")}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

