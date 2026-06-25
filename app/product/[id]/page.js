'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    if (!id) return

    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data)
      })
      .catch(err => console.error(err))
  }, [id])

  const addToCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || []

    const existing = savedCart.find(
      item => (item._id || item.id) === (product._id || product.id)
    )

    let updatedCart

    if (existing) {
      updatedCart = savedCart.map(item =>
        (item._id || item.id) === (product._id || product.id)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    } else {
      updatedCart = [...savedCart, { ...product, quantity: 1 }]
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart))
    alert("Added to cart!")
  }

  if (!product) {
    return <p className="p-10 text-center">Loading...</p>
  }

  return (
    <div className="min-h-screen p-10">
      <div className="max-w-4xl mx-auto">
        <img
          src={product.image}
          alt={product.name}
          className="w-full max-w-md rounded"
        />

        <h1 className="text-3xl font-bold mt-4">
          {product.name}
        </h1>

        <p className="mt-2">
          {product.description}
        </p>

        <p className="text-2xl font-bold mt-4">
          ${product.price}
        </p>

        <button
          onClick={addToCart}
          className="mt-6 bg-black text-white px-6 py-3 rounded"
        >
          Add To Cart
        </button>
      </div>
    </div>
  )
}