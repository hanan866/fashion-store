"use client"

import { useRef } from "react"

export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist
}) {
  const clickCount = useRef(0)
  const clickTimer = useRef(null)

  const handleImageClick = () => {
    clickCount.current += 1

    if (clickTimer.current) {
      clearTimeout(clickTimer.current)
    }

    clickTimer.current = setTimeout(() => {
      if (clickCount.current === 1) {
        onAddToCart(product)
      }

      if (clickCount.current === 2) {
        onToggleWishlist(product)
      }

      clickCount.current = 0
      clickTimer.current = null
    }, 300)
  }

  return (
    <div className="group cursor-pointer">
      <div className="overflow-hidden rounded-xl">
        <img
          src={product.image || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop"}
          alt={product.name}
          onClick={handleImageClick}
          className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-3">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-gray-500">{product.category}</p>
        <p className="font-bold">${product.price}</p>
      </div>
    </div>
  )
}