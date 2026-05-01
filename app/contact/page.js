'use client'

import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Message sent! (This is just a demo)')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black p-6">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
        
        {/* Left Side - Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Contact Us
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Have a question? Send us a message and we’ll get back to you.
          </p>

          <div className="space-y-3">
            <p>
              📧 Email:{" "}
              <a 
                href="mailto:saremhanan44@email.com" 
                className="text-blue-500 hover:underline"
              >
                saremhanan44@email.com
              </a>
            </p>

            <p>
              📞 Phone:{" "}
              <a 
                href="tel:+251905331259" 
                className="text-blue-500 hover:underline"
              >
                +251 905 331 259
              </a>
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            rows="4"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}