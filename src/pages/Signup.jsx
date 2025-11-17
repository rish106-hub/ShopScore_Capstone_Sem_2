import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("https://shopscore.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json"
         },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="auth-page min-h-[calc(100dvh-120px)] bg-gradient-to-b from-background to-secondary/40">
        <div className="container flex items-center justify-center py-12">
          <div className="auth-form-container w-full max-w-md rounded-2xl border border-border bg-white/70 dark:bg-black/30 backdrop-blur shadow-sm">
            <div className="px-6 py-8">
              <h1 className="auth-title text-2xl font-semibold tracking-tight text-foreground">Create Account</h1>
              <p className="mt-1 text-sm text-muted-foreground">Join ShopScore and start sharing and reading honest reviews.</p>

              <form onSubmit={handleSubmit} className="auth-form mt-6 space-y-4">
                <div className="form-group space-y-1.5">
                  <label className="form-label text-sm text-foreground">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-input w-full rounded-lg border border-border bg-white/70 dark:bg-black/30 backdrop-blur px-4 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group space-y-1.5">
                  <label className="form-label text-sm text-foreground">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input w-full rounded-lg border border-border bg-white/70 dark:bg-black/30 backdrop-blur px-4 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="form-group space-y-1.5">
                  <label className="form-label text-sm text-foreground">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-input w-full rounded-lg border border-border bg-white/70 dark:bg-black/30 backdrop-blur px-4 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    autoComplete="tel"
                  />
                </div>

                <div className="form-group space-y-1.5">
                  <label className="form-label text-sm text-foreground">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="form-input w-full rounded-lg border border-border bg-white/70 dark:bg-black/30 backdrop-blur px-4 py-2 pr-20 text-sm outline-none ring-offset-background placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute inset-y-0 right-2 my-1 inline-flex items-center rounded-md px-3 text-xs font-medium text-foreground/80 hover:bg-secondary"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <div className="form-group space-y-1.5">
                  <label className="form-label text-sm text-foreground">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      name="confirmPassword"
                      className="form-input w-full rounded-lg border border-border bg-white/70 dark:bg-black/30 backdrop-blur px-4 py-2 pr-24 text-sm outline-none ring-offset-background placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute inset-y-0 right-2 my-1 inline-flex items-center rounded-md px-3 text-xs font-medium text-foreground/80 hover:bg-secondary"
                      aria-label={showConfirm ? "Hide password" : "Show password"}
                    >
                      {showConfirm ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="error-message rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    {error}
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Sign Up"}
                </Button>

                <p className="auth-redirect text-center text-sm text-muted-foreground">
                  Already have an account? {""}
                  <Link to="/login" className="text-primary hover:underline underline-offset-4">Log in</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Signup;
