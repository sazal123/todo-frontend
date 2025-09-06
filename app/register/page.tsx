"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "../../lib/api"; // use your API helper

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const token = await register({ name, email, password });
      router.push("/login");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Registration failed");
    }
  };

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Register
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <button
            onClick={handleRegister}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Register
          </button>
          <button
            onClick={handleLoginRedirect}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition"
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </main>
  );
}
