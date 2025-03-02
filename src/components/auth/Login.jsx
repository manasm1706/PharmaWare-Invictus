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

  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials.email, credentials.password);
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      {/* Left: Landing Content */}
      <div className="landing-section">
        <h1>Welcome to Our Platform</h1>
        <p>Your ultimate health companion for managing medications, caregivers, and pharmacies.</p>
        <Link to='/dashboard'>
        <button className="explore-btn">Explore More</button>
        </Link>

        {/* Additional Content Below */}
        <div className="landing-extra">
          <h2>Why Choose Us?</h2>
          <p>✔ Easy medication tracking</p>
          <p>✔ Find caregivers with ease</p>
          <p>✔ Locate nearby pharmacies</p>
        </div>
      </div>

      {/* Right: Login Section */}
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
        
        <p className="register-text">Don't have an account? <a href="/register">Register</a></p>
      </div>
    </div>
  );
};

export default Login;
