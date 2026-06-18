"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const router = useRouter()

  const handleSubmit = () => {
    if (!email || !password) return

    if (isSignup && password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    const user = { name, email }
    localStorage.setItem("user", JSON.stringify(user))
    router.push("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black">
            Fashion Store
          </h1>
          <p className="text-gray-500 mt-2">
            {isSignup ? "Create your account" : "Welcome back"}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setIsSignup(false)}
            className={`flex-1 py-2 rounded-lg font-medium transition ${
              !isSignup
                ? "bg-black text-white"
                : "text-gray-600"
            }`}
          >
            Sign In
          </button>

          <button
            onClick={() => setIsSignup(true)}
            className={`flex-1 py-2 rounded-lg font-medium transition ${
              isSignup
                ? "bg-black text-white"
                : "text-gray-600"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Name */}
        {isSignup && (
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
          className="w-full border border-gray-300 rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Confirm Password */}
        {isSignup && (
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border border-gray-300 rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-xl font-semibold transition"
        >
          {isSignup ? "Create Account" : "Sign In"}
        </button>

        {/* Forgot password */}
        {!isSignup && (
          <p className="text-center text-sm text-gray-500 mt-4 cursor-pointer hover:text-black">
            Forgot Password?
          </p>
        )}
      </div>
    </div>
  )
}