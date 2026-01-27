import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const signup = (email, password, name) => {
    // Simulate API call for signup
    const newUser = { email, name, id: Date.now() };
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("userPassword", password); // In real app, use secure backend
    setUser(newUser);
    setIsAuthenticated(true);
    return { success: true };
  };

  const signin = (email, password) => {
    // Simulate API call for signin
    const storedUser = localStorage.getItem("user");
    const storedPassword = localStorage.getItem("userPassword");

    if (storedUser && storedPassword === password) {
      const user = JSON.parse(storedUser);
      if (user.email === email) {
        setUser(user);
        setIsAuthenticated(true);
        return { success: true };
      }
    }
    return { success: false, message: "Invalid email or password" };
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userPassword");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, signup, signin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
