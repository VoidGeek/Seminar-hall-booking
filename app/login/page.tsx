"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLoggedIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
  
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Invalid credentials. Please try again.");
        return;
      }
  
      // Set isLoggedIn state to true
      setIsLoggedIn(true);
  
      // Store logged-in state in localStorage
      localStorage.setItem("isLoggedIn", "true");
  
      router.push("/halls");
    } catch {
      setError("An error occurred. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg card">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        {error && <p className="text-center mb-4 text-var-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span>Email:</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 p-3 rounded-lg placeholder-gray-400 border focus:outline-none focus:ring-2 focus:ring-var-primary"
              placeholder="Enter your email"
              required
              aria-label="Email"
            />
          </label>
          <label className="block mb-4">
            <span>Password:</span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 p-3 rounded-lg placeholder-gray-400 border focus:outline-none focus:ring-2 focus:ring-var-primary"
                placeholder="Enter your password"
                required
                aria-label="Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>
          <button
            type="submit"
            className={`w-full py-3 font-semibold rounded-lg transition ${
              isLoading
                ? "cursor-not-allowed bg-gray-300"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
