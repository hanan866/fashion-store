'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  // ✅ TEMP PRODUCTS (will be replaced by backend later)
  const products = [
    {
      id: "1",
      name: "Stylish Jacket",
      price: 60,
      description: "Warm and trendy jacket",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"
    },
    {
      id: "2",
      name: "Modern Hoodie",
      price: 45,
      description: "Comfortable hoodie",
      image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500"
    },
    {
      id: "3",
      name: "Classic T-Shirt",
      price: 25,
      description: "Simple everyday t-shirt",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab9?w=500"
    }
  ]

  // 🔍 Find product based on URL id
  useEffect(() => {
    const found = products.find(p => p.id === id)
    setProduct(found)
  }, [id])

  // 🛒 Add to cart
  const addToCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || []

    const existing = savedCart.find(item => item.id === product.id)

    let updatedCart

    if (existing) {
      updatedCart = savedCart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    } else {
      updatedCart = [...savedCart, { ...product, quantity: 1 }]
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart))
    alert("Added to cart!")
  }

  // ⏳ Loading state
  if (!product) {
    return <p className="p-10 text-center">Loading...</p>
  }

  return (
    <div className="min-h-screen p-10 bg-gray-50 dark:bg-black">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-xl shadow">

        <div className="grid md:grid-cols-2 gap-6">

          {/* 🖼️ PRODUCT IMAGE */}
          <img
            src={product.image || "https://via.placeholder.com/400"}
            alt={product.name}
            className="w-full h-72 object-cover rounded"
          />

          {/* 📄 PRODUCT INFO */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {product.name}
            </h1>

            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {product.description}
            </p>

            <p className="text-xl font-bold mt-4 text-gray-900 dark:text-white">
              ${product.price}
            </p>

            <button
              onClick={addToCart}
              className="mt-6 bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}