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
  const updateProfile = async (name, email, password) => {
    try {
      const token = localStorage.getItem("token");
  
      const response = await fetch("http://localhost:5002/api/auth/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Send token for authentication
        },
        body: JSON.stringify({ name, email, password }),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to update profile");
  
      setCurrentUser(data);
      localStorage.setItem("user", JSON.stringify(data));
  
      return true;
    } catch (error) {
      console.error("❌ Update Profile Error:", error.message);
      return false;
    }
  };
  
  const deleteAccount = async () => {
    try {
      const token = localStorage.getItem("token");
  
      const response = await fetch("http://localhost:5002/api/auth/delete", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to delete account");
  
      logout(); // ✅ Remove user from localStorage and redirect
      return true;
    } catch (error) {
      console.error("❌ Delete Account Error:", error.message);
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
