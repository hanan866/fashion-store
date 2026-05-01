'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function NewArrivals() {
  const [cart, setCart] = useState([])

  const products = [
    { id: 1, name: "Stylish Jacket", price: 60, image: "/jacket.jpg" },
    { id: 2, name: "Modern Hoodie", price: 45, image: "/hoodie.jpg" },
    { id: 3, name: "Classic T-Shirt", price: 25, image: "/tshirt.jpg" },
  ]

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id)

    let updatedCart

    if (existing) {
      updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }]
    }

    setCart(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    alert("Added to cart!")
  }

  return (
    <div className="min-h-screen p-10 bg-gray-50 dark:bg-black">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        New Arrivals
      </h1>

      <p className="mb-8 text-gray-600 dark:text-gray-400">
        Check out our latest fashion items 🧥✨
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
          >

            {/* Product Link */}
            <Link href={`/product/${product.id}`}>
              <div className="cursor-pointer">
                
                {/* Image placeholder */}
                <div className="h-40 bg-gray-200 mb-3 rounded"></div>

                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {product.name}
                </h3>

                <p className="text-gray-600 dark:text-gray-400">
                  ${product.price}
                </p>

              </div>
            </Link>

            {/* Add to cart button */}
            <button
              onClick={() => addToCart(product)}
              className="mt-3 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            >
              Add to Cart
            </button>

          </div>
        ))}
      </div>
    </div>
  )
}