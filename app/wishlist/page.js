'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, ShoppingBag, Trash2 } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([])
  const [cart, setCart] = useState([])
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist')
    const savedCart = localStorage.getItem('cart')
    const savedDarkMode = localStorage.getItem('darkMode')
    
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist))
    if (savedCart) setCart(JSON.parse(savedCart))
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode))
  }, [])

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(item => item.id !== productId)
    setWishlist(updatedWishlist)
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist))
  }

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
      setCart(updatedCart)
      localStorage.setItem('cart', JSON.stringify(updatedCart))
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }]
      setCart(updatedCart)
      localStorage.setItem('cart', JSON.stringify(updatedCart))
    }
    alert('Added to cart!')
  }

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('darkMode', JSON.stringify(newMode))
    if (newMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <>
      <Navbar cartCount={cart.length} wishlistCount={wishlist.length} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">My Wishlist</h1>
          
          {wishlist.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">Your wishlist is empty</p>
              <Link href="/shop" className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {wishlist.map((product) => (
                <div key={product.id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm">
                  <div className="relative h-64">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{product.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">{product.category}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">${product.price}</span>
                      <button
                        onClick={() => addToCart(product)}
                        className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}