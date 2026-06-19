"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function CartPage() {
  const [cart, setCart] = useState([])

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  const updateCart = (newCart) => {
    setCart(newCart)
    localStorage.setItem("cart", JSON.stringify(newCart))
  }

  const increaseQty = (id) => {
    const updated = cart.map(item =>
      (item._id || item.id) === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
    updateCart(updated)
  }

  const decreaseQty = (id) => {
    const updated = cart
      .map(item =>
        (item._id || item.id) === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0)

    updateCart(updated)
  }

  const removeItem = (id) => {
    const updated = cart.filter(item => (item._id || item.id) !== id)
    updateCart(updated)
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map(item => (
            <div
              key={item._id || item.id}
              className="flex items-center justify-between border-b py-4"
            >
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p>${item.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => decreaseQty(item._id || item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQty(item._id || item.id)}>+</button>
              </div>

              <button
                onClick={() => removeItem(item._id || item.id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-6 text-xl font-bold">
            Total: ${total}
          </div>

          <button className="mt-4 bg-black text-white px-4 py-2 rounded">
            Checkout
          </button>
        </>
      )}

      <div className="mt-6">
        <Link href="/" className="text-blue-500">
          ← Continue Shopping
        </Link>
      </div>
    </div>
  )
}