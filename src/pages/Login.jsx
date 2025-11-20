import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Loader2, ShoppingBag } from "lucide-react";
import happyCustomer from "../assets/happy_customer.png";

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
    <div className="w-full h-screen lg:grid lg:grid-cols-2 overflow-hidden">
      {/* Left Side - Decorative */}
      <div className="relative hidden lg:flex flex-col justify-between bg-zinc-900 p-10 text-white dark:border-r">
        <div className="flex items-center gap-2 font-medium text-lg z-10">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ShoppingBag className="h-5 w-5 text-white" />
          </div>
          ShopScore
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-xl font-medium leading-relaxed">
              &ldquo;ShopScore has completely transformed how I shop online. The deals are amazing and the delivery is super fast.&rdquo;
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
        <div className="absolute inset-0 bg-zinc-900 opacity-50 z-0" />
        {/* Abstract background pattern */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background relative z-10">
        <div className="mx-auto grid w-full max-w-[400px] gap-6">
          <div className="flex flex-col space-y-2 text-center">
            <div className="flex justify-center lg:hidden mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4">
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
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline text-muted-foreground hover:text-primary transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>
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

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full transition-all duration-200" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <Button variant="outline" type="button" disabled={isLoading} className="w-full hover:bg-secondary/50 transition-colors">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
          </form>

          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="underline underline-offset-4 hover:text-primary transition-colors">
              Sign up
            </Link>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Login;
