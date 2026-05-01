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

  // 🔁 Load from localStorage (no loading screen)
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    const savedWishlist = localStorage.getItem('wishlist')
    const savedDarkMode = localStorage.getItem('darkMode')

    if (savedCart) setCart(JSON.parse(savedCart))
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist))
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode))
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
    const existing = cart.find(item => item.id === product.id)

    if (existing) {
      const updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
      setCart(updatedCart)
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  // ❤️ wishlist toggle
  const toggleWishlist = (product) => {
    if (wishlist.some(item => item.id === product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id))
    } else {
      setWishlist([...wishlist, product])
    }
  }

  // 🌙 dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode)

  // 📦 Fake products (temporary)
  const newArrivals = [
    {
      id: 1,
      name: 'Classic Wool Coat',
      category: 'Outerwear',
      price: 299,
      image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=400&h=500&fit=crop',
      sizes: ['S', 'M', 'L', 'XL'],
    },
    {
      id: 2,
      name: 'Cashmere Sweater',
      category: 'Knitwear',
      price: 189,
      image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400&h=500&fit=crop',
      sizes: ['S', 'M', 'L'],
    },
    {
      id: 3,
      name: 'Leather Jacket',
      category: 'Outerwear',
      price: 399,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop',
      sizes: ['M', 'L', 'XL'],
    },
    {
      id: 4,
      name: 'Silk Blouse',
      category: 'Tops',
      price: 129,
      image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=400&h=500&fit=crop',
      sizes: ['XS', 'S', 'M', 'L'],
    },
  ]

  const bestSellers = [
    {
      id: 5,
      name: 'Slim Fit Jeans',
      category: 'Denim',
      price: 89,
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop',
      sizes: ['28', '30', '32', '34', '36'],
    },
    {
      id: 6,
      name: 'White T-Shirt',
      category: 'Basics',
      price: 29,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
      sizes: ['S', 'M', 'L', 'XL'],
    },
    {
      id: 7,
      name: 'Wool Blazer',
      category: 'Formal',
      price: 249,
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=500&fit=crop',
      sizes: ['S', 'M', 'L'],
    },
    {
      id: 8,
      name: 'Leather Boots',
      category: 'Footwear',
      price: 199,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop',
      sizes: ['7', '8', '9', '10', '11'],
    },
  ]

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