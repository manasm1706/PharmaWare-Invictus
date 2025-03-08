import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/Auth.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending login request with:", credentials); // ✅ Debugging log
    const success = await login(credentials.email, credentials.password);

    if (success) {
      navigate("/dashboard"); // ✅ Redirect to dashboard if login succeeds
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-page">
      <div className="landing-section">
        <h1>Welcome to Our Platform</h1>
        <p>Your ultimate health companion for managing medications, caregivers, and pharmacies.</p>
        <Link to="/dashboard">
          <button className="explore-btn">Explore More</button>
        </Link>
      </div>

      <div className="login-section">
        <h2>Login to Continue</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p className="register-text">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
