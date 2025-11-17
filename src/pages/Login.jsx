import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(formData.email, formData.password);
      navigate("/products");
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
              <h1 className="auth-title text-2xl font-semibold tracking-tight text-foreground">Welcome Back</h1>
              <p className="auth-subtitle mt-1 text-sm text-muted-foreground">Log in to your account</p>

              <form onSubmit={handleSubmit} className="auth-form mt-6 space-y-4">
                <div className="form-group space-y-1.5">
                  <label className="form-label text-sm text-foreground">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input w-full rounded-lg border border-border bg-white/70 dark:bg-black/30 backdrop-blur px-4 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                    autoComplete="email"
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
                      placeholder="Enter your password"
                      autoComplete="current-password"
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

                {error && (
                  <div className="error-message rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    {error}
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>

                <p className="text-[11px] leading-relaxed text-muted-foreground/80">
                  Never share your password. ShopScore will never ask for your credentials via email or WhatsApp.
                </p>

                <p className="auth-redirect text-center text-sm text-muted-foreground">
                  Dont have an account?{" "}
                  <Link to="/signup" className="text-primary hover:underline underline-offset-4">Sign up</Link>
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

export default Login;
