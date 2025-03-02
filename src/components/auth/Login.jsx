"use client"

import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { LanguageContext } from "../../context/LanguageContext"
import "../../styles/Auth.css"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useContext(AuthContext)
  const { t } = useContext(LanguageContext)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    // Simple validation
    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    // In a real app, this would make an API call
    // For demo purposes, we'll simulate a successful login
    const success = login({
      id: "1",
      email,
      name: "Demo User",
    })

    if (success) {
      navigate("/dashboard")
    } else {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">{t("login")}</h2>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">{t("email")}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">{t("password")}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
          </div>
          <button type="submit" className="auth-button">
            {t("login")}
          </button>
        </form>
        <div className="auth-links">
          <p>
            {t("dontHaveAccount")} <Link to="/register">{t("register")}</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

