"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [name, setName] = useState("")
  const router = useRouter()

  const handleLogin = () => {
    if (!name) return

    const user = {
      name: name
    }

    localStorage.setItem("user", JSON.stringify(user))

    router.push("/")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h1 className="text-xl font-bold mb-4">Login</h1>

        <input
          type="text"
          placeholder="Enter your name"
          className="w-full border p-2 mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-2"
        >
          Login
        </button>
      </div>
    </div>
  )
}