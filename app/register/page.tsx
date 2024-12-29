"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      setSuccess(true);
      setTimeout(() => router.push("/login"), 2000); // Redirect to login page after 2 seconds
    } else {
      const data = await response.json();
      setError(data.error || "Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg card">
        <h1 className="text-2xl font-semibold text-center mb-4">Register</h1>
        {error && <p className="text-center mb-4 text-var-error">{error}</p>}
        {success && (
          <p className="text-center mb-4 text-var-primary">
            Registration successful! Redirecting...
          </p>
        )}
        <form onSubmit={handleSubmit} className="mt-4">
          <label className="block mb-2">
            <span>Email:</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 p-3 rounded-lg placeholder-gray-400 border focus:outline-none focus:ring-2 focus:ring-var-primary"
              placeholder="Enter your email"
              required
            />
          </label>
          <label className="block mb-2 mt-4">
            <span>Password:</span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 p-3 rounded-lg placeholder-gray-400 border focus:outline-none focus:ring-2 focus:ring-var-primary"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>
          <label className="block mb-2 mt-4">
            <span>Confirm Password:</span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full mt-2 p-3 rounded-lg placeholder-gray-400 border focus:outline-none focus:ring-2 focus:ring-var-primary"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>
          <button
            type="submit"
            className={`w-full py-3 font-semibold rounded-lg transition ${
              success ? "cursor-not-allowed bg-gray-300" : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
            disabled={success}
          >
            {success ? "Redirecting..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
