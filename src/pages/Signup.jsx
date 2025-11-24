import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Loader2, ArrowLeft, ShoppingBag } from "lucide-react";
import happyCustomer from "../assets/happy_customer.png";
import authBackground from "../assets/auth-background.png";

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
        headers: { "Content-Type": "application/json" },
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
    <div className="w-full h-screen lg:grid lg:grid-cols-2 overflow-hidden">
      {/* Left Side - Decorative */}
      <div className="relative hidden lg:flex flex-col justify-between p-10 text-white dark:border-r">
        <div className="flex items-center gap-2 font-medium text-lg z-10">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ShoppingBag className="h-5 w-5 text-white" />
          </div>
          ShopScore
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-xl font-medium leading-relaxed">
              &ldquo;Joining ShopScore was the best decision. I've discovered so many unique products and the community reviews are genuinely helpful.&rdquo;
            </p>
            <footer className="flex items-center gap-4 pt-4">
              <img
                src={happyCustomer}
                alt="Uttam Mahato"
                className="h-12 w-12 rounded-full object-cover border-2 border-white/20"
              />
              <div className="text-sm">
                <div className="font-semibold">Uttam Mahato</div>
                <div className="text-zinc-400">Verified Customer</div>
              </div>
            </footer>
          </blockquote>
        </div>
        <div className="absolute inset-0 bg-zinc-900/40 z-0" />
        <img
          src={authBackground}
          alt="Background"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background relative z-10 overflow-y-auto">
        <div className="mx-auto grid w-full max-w-[400px] gap-6 animate-in fade-in zoom-in-95 duration-500">
          <div className="flex flex-col space-y-2 text-center">
            <div className="flex justify-center lg:hidden mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">
              Enter your details below to create your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4 animate-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
                value={formData.name}
                onChange={handleInputChange}
                disabled={isLoading}
                className="bg-background transition-all duration-200 focus-visible:ring-offset-0"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
                className="bg-background transition-all duration-200 focus-visible:ring-offset-0"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                required
                value={formData.phone}
                onChange={handleInputChange}
                disabled={isLoading}
                className="bg-background transition-all duration-200 focus-visible:ring-offset-0"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="pr-10 bg-background transition-all duration-200 focus-visible:ring-offset-0"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <span className="text-xs">Hide</span>
                  ) : (
                    <span className="text-xs">Show</span>
                  )}
                </button>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="pr-10 bg-background transition-all duration-200 focus-visible:ring-offset-0"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirm ? (
                    <span className="text-xs">Hide</span>
                  ) : (
                    <span className="text-xs">Show</span>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full transition-all duration-200" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
            </Button>
          </form>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline underline-offset-4 hover:text-primary transition-colors">
              Sign in
            </Link>
          </div>

          <div className="text-center pb-4">
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground flex items-center justify-center gap-1 transition-colors">
              <ArrowLeft className="h-3 w-3" /> Back to Store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
