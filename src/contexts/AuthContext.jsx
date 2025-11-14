import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🧩 Check if a user is already logged in when the app starts
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await fetch("https://shopscore.onrender.com/api/auth/me", {
          method: "GET",
          credentials: "include", // crucial for sending cookies
        });

        if (response.ok) {
          const data = await response.json();
          setCurrentUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          setCurrentUser(null);
          localStorage.removeItem("user");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  // 🔐 Login: call backend and set user from response
  const login = async (email, password) => {
    const response = await fetch("https://shopscore.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Login failed");

    setCurrentUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data.user;
  };

  // 🧾 Signup: handled separately (redirects to login)
  const signup = async (name, email, phone, password) => {
    const response = await fetch("https://shopscore.onrender.com/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, email, phone, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Signup failed");

    return data.message;
  };

  // 🚪 Logout: clears backend cookie + local state
  const logout = async () => {
    try {
      await fetch("https://shopscore.onrender.com/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setCurrentUser(null);
      localStorage.removeItem("user");
    }
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
