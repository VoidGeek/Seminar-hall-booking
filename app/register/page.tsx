"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for showing/hiding passwords
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
    <div className="max-w-sm mx-auto mt-8 bg-gray-800 p-6 rounded-lg text-white">
      <h1 className="text-2xl font-semibold text-center mb-4">Register</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && (
        <p className="text-green-500 text-center">
          Registration successful! Redirecting...
        </p>
      )}
      <form onSubmit={handleSubmit} className="mt-4">
        <label className="block mb-2">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 p-2 border border-gray-600 bg-gray-700 rounded text-white placeholder-gray-400"
            placeholder="Enter your email"
            required
          />
        </label>
        <label className="block mb-2 mt-4">
          Password:
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-600 bg-gray-700 rounded text-white placeholder-gray-400"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-2 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </label>
        <label className="block mb-2 mt-4">
          Confirm Password:
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-600 bg-gray-700 rounded text-white placeholder-gray-400"
              placeholder="Confirm your password"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-2 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </label>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
