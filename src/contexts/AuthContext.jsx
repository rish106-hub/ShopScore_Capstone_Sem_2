import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const SESSION_KEY = "user";
  const SESSION_EXPIRES_AT_KEY = "session_expires_at";
  const SESSION_MINUTES = 20;

  const setSessionExpiry = () => {
    const expiresAt = Date.now() + SESSION_MINUTES * 60 * 1000;
    localStorage.setItem(SESSION_EXPIRES_AT_KEY, String(expiresAt));
  };

  const isSessionActive = () => {
    const raw = localStorage.getItem(SESSION_EXPIRES_AT_KEY);
    if (!raw) return false;
    const expiresAt = Number(raw);
    return Number.isFinite(expiresAt) && Date.now() < expiresAt;
  };

  useEffect(() => {
    const refreshOnActivity = () => {
      if (currentUser) setSessionExpiry();
    };
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((ev) => window.addEventListener(ev, refreshOnActivity));
    return () => {
      events.forEach((ev) => window.removeEventListener(ev, refreshOnActivity));
    };
  }, [currentUser]);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        // If we have a non-expired local session, trust it to provide at least 20 minutes continuity
        const savedUser = localStorage.getItem(SESSION_KEY);
        if (savedUser && isSessionActive()) {
          const parsed = JSON.parse(savedUser);
          setCurrentUser(parsed);
          // extend the session on boot
          setSessionExpiry();
          return;
        }

        // Otherwise, verify with backend and initialize a fresh 20-minute session window
        const response = await fetch(`${API_URL}/api/auth/me`, {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setCurrentUser(data.user);
          localStorage.setItem(SESSION_KEY, JSON.stringify(data.user));
          setSessionExpiry();
        } else {
          setCurrentUser(null);
          localStorage.removeItem(SESSION_KEY);
          localStorage.removeItem(SESSION_EXPIRES_AT_KEY);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    bootstrapAuth();
  }, []);

  // 🔐 Login: call backend and set user from response
  const login = async (email, password) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Login failed");

    const user = data.user || (data.data && data.data.user) || null;
    if (!user) throw new Error("Login failed: user missing in response");

    setCurrentUser(user);
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    setSessionExpiry();

    return data.user;
  };
  const signup = async (name, email, phone, password) => {
    const response = await fetch(`${API_URL}/api/auth/signup`, {
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
      await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setCurrentUser(null);
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(SESSION_EXPIRES_AT_KEY);
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="flex items-center justify-center h-screen w-screen bg-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
