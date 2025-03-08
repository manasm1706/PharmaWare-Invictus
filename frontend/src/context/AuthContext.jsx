"use client";

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      console.log("🔹 Sending login request with:", { email, password });
  
      const response = await fetch("http://localhost:5002/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // ✅ Ensure plain text password is sent
      });
  
      const data = await response.json();
  
      if (!response.ok) throw new Error(data.message || "Login failed");
  
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setCurrentUser(data.user);
  
      return true;
    } catch (error) {
      console.error("❌ Login Error:", error.message);
      return false;
    }
  };
  

  // ✅ Send register request to backend
  const register = async (name, email, password) => {
    try {
      console.log("🔹 Sending register request:", { name, email, password });
  
      const response = await fetch("http://localhost:5002/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }), // ✅ Ensure correct data format
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");
  
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setCurrentUser(data.user);
  
      return true;
    } catch (error) {
      console.error("❌ Register Error:", error.message);
      return false;
    }
  };
  
  // ✅ Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
