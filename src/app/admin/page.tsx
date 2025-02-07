"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaLock } from "react-icons/fa";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulating an API request (Replace with real API call)
    const isValidUser = email === "msyeda808@gmail.com" && password === "Mehma123.";

    if (isValidUser) {
      localStorage.setItem("isLoggedIn", "true"); // Store login state
      router.push("/admin/dashboard");

    } else {
      setError("Invalid email or password. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-sm border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Admin Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 p-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 p-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className={`w-full p-3 rounded-lg text-white font-semibold transition ${
              loading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
