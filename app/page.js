'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import ProductGrid from '@/components/ProductGrid'
import Footer from '@/components/Footer'

export default function Home() {
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const [products, setProducts] = useState([])

  // 🔁 Load from localStorage (no loading screen)
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    const savedWishlist = localStorage.getItem('wishlist')
    const savedDarkMode = localStorage.getItem('darkMode')

    if (savedCart) setCart(JSON.parse(savedCart))
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist))
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode))
  }, [])


  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.error(error)
    }
  }

  fetchProducts()
}, [])

  // 💾 Save + apply dark mode
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
    localStorage.setItem('darkMode', JSON.stringify(darkMode))

    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [cart, wishlist, darkMode])

  // 🛒 FIXED cart logic (no duplicates)
 const addToCart = (product) => {
  const existingCart = JSON.parse(localStorage.getItem("cart")) || []

  const id = product._id || product.id

  const existing = existingCart.find(
    item => (item._id || item.id) === id
  )

  let updatedCart

  if (existing) {
    updatedCart = existingCart.map(item =>
      (item._id || item.id) === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  } else {
    updatedCart = [...existingCart, { ...product, quantity: 1 }]
  }

  localStorage.setItem("cart", JSON.stringify(updatedCart))
  setCart(updatedCart)
}

  // ❤️ wishlist toggle
  const toggleWishlist = (product) => {
  const id = product._id || product.id

  if (
    wishlist.some(
      item => (item._id || item.id) === id
    )
  ) {
    setWishlist(
      wishlist.filter(
        item => (item._id || item.id) !== id
      )
    )
  } else {
    setWishlist([...wishlist, product])
  }
}

  // 🌙 dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode)

  // 📦 Fake products (temporary)
  const newArrivals = products

  const bestSellers = products
  

  return (
    <>
      <Navbar
        cartCount={cart.length}
        wishlistCount={wishlist.length}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <main>
        <Hero />

        {/* New Arrivals */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              title="New Arrivals"
              subtitle="Discover our latest collection"
            />
            <ProductGrid
              products={newArrivals}
              onAddToCart={addToCart}
              onToggleWishlist={toggleWishlist}
              wishlist={wishlist}
            />
          </div>
        </section>

        {/* Best Sellers */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              title="Best Sellers"
              subtitle="Customer favorites"
            />
            <ProductGrid
              products={bestSellers}
              onAddToCart={addToCart}
              onToggleWishlist={toggleWishlist}
              wishlist={wishlist}
            />
          </div>
        </section>

        {/* Banner */}
        <section className="py-20 px-4 bg-gradient-to-r from-gray-900 to-gray-700 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Limited Time Offer
            </h2>
            <p className="text-xl mb-8">
              Get up to 50% off on selected items
            </p>
            <button className="bg-white text-gray-900 px-8 py-3 rounded-full hover:bg-gray-100 transition-colors">
              Shop Sale
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}