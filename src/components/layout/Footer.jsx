"use client"

import { useContext } from "react"
import { Link } from "react-router-dom"
import { LanguageContext } from "../../context/LanguageContext"
import "../../styles/Footer.css"

const Footer = () => {
  const { t } = useContext(LanguageContext)

  return (
    <footer className="footer">
      <div className="footer-container">
       

        <div className="footer-section">
          <h3>{t("quickLinks")}</h3>
          <ul className="footer-links">
            <li>
              <Link to="/dashboard">{t("dashboard")}</Link>
            </li>
            <li>
              <Link to="/medications">{t("medications")}</Link>
            </li>
            <li>
              <Link to="/caregivers">{t("caregivers")}</Link>
            </li>
            <li>
              <Link to="/pharmacy-finder">{t("pharmacyFinder")}</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>{t("help")}</h3>
          <ul className="footer-links">
            <li>
              <Link to="/help">{t("helpCenter")}</Link>
            </li>
            <li>
              <Link to="/privacy">{t("privacyPolicy")}</Link>
            </li>
            <li>
              <Link to="/terms">{t("termsOfService")}</Link>
            </li>
            <li>
              <Link to="/contact">{t("contactSupport")}</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} {t("appName")}. {t("allRightsReserved")}
        </p>
      </div>
    </footer>
  )
}

export default Footer

